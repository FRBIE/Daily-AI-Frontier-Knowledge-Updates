import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 8787);

const OPENCLAW_SESSIONS = "/home/ubuntu/.openclaw/agents/main/sessions/sessions.json";
const RUNTIME_DIR = path.join(__dirname, ".runtime");
const APPROVAL_LOG = path.join(RUNTIME_DIR, "approvals.jsonl");
const CONTROL_LOG = path.join(RUNTIME_DIR, "controls.jsonl");
const COMMANDS_FILE = path.join(RUNTIME_DIR, "commands.json");

const AUTH_USER = "admin";
const AUTH_PASS = "Ak#123456";
const AUTH_COOKIE = "studio_auth";
const AUTH_TTL_MS = 24 * 60 * 60 * 1000;

const TOKENS = new Map();
const LIVE_CLIENTS = new Set();

const SKILLS = [
  { name: "feishu-doc", description: "Feishu document read/write operations.", location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/extensions/feishu/skills/feishu-doc/SKILL.md" },
  { name: "feishu-drive", description: "Feishu cloud storage file management.", location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/extensions/feishu/skills/feishu-drive/SKILL.md" },
  { name: "feishu-perm", description: "Feishu permission management.", location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/extensions/feishu/skills/feishu-perm/SKILL.md" },
  { name: "feishu-wiki", description: "Feishu knowledge base navigation.", location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/extensions/feishu/skills/feishu-wiki/SKILL.md" },
  { name: "healthcheck", description: "OpenClaw host security hardening checks.", location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/skills/healthcheck/SKILL.md" },
  { name: "skill-creator", description: "Create or update AgentSkills.", location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/skills/skill-creator/SKILL.md" },
  { name: "tmux", description: "Remote-control tmux sessions for interactive CLIs.", location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/skills/tmux/SKILL.md" },
  { name: "weather", description: "Current weather and forecasts via wttr.in/Open-Meteo.", location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/skills/weather/SKILL.md" },
  { name: "auto-updater", description: "Automatically update Clawdbot and installed skills.", location: "/home/ubuntu/.openclaw/workspace/skills/auto-updater/SKILL.md" },
  { name: "browserwing-executor", description: "Control browser automation through HTTP API.", location: "/home/ubuntu/.openclaw/workspace/skills/browserwing-executor/SKILL.md" },
  { name: "skill-vetter", description: "Security-first skill vetting for AI agents.", location: "/home/ubuntu/.openclaw/workspace/skills/skill-vetter/SKILL.md" }
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

function send(res, code, body, headers = {}) {
  res.writeHead(code, headers);
  res.end(body);
}

function readJson(file, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk.toString("utf8");
      if (raw.length > 1024 * 1024) reject(new Error("payload too large"));
    });
    req.on("end", () => resolve(raw));
    req.on("error", reject);
  });
}

function parseCookies(cookie = "") {
  const out = {};
  for (const part of cookie.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function createAuthToken() {
  const token = crypto.randomBytes(24).toString("hex");
  TOKENS.set(token, Date.now() + AUTH_TTL_MS);
  return token;
}

function isAuthed(req) {
  const token = parseCookies(req.headers.cookie || "")[AUTH_COOKIE];
  if (!token) return false;
  const exp = TOKENS.get(token);
  if (!exp || exp < Date.now()) {
    TOKENS.delete(token);
    return false;
  }
  return true;
}

function findSessionMeta(sessionKey) {
  const all = readJson(OPENCLAW_SESSIONS, {});
  if (sessionKey && all[sessionKey]) return all[sessionKey];

  let selected = null;
  for (const [key, value] of Object.entries(all)) {
    if (!key.startsWith("agent:main:")) continue;
    if (!value || !value.sessionFile) continue;
    if (!selected || (value.updatedAt || 0) > (selected.updatedAt || 0)) selected = value;
  }
  return selected;
}

function findSessionFile(sessionKey) {
  const meta = findSessionMeta(sessionKey);
  return meta ? meta.sessionFile : null;
}

function mapAgent(toolName) {
  if (!toolName) return "agent-main";
  if (["web_search", "web_fetch", "read", "image", "pdf"].includes(toolName)) return "agent-main";
  if (["write", "edit", "exec", "browser", "canvas"].includes(toolName)) return "agent-main";
  return "agent-main";
}

function firstText(content) {
  if (!Array.isArray(content)) return "";
  const t = content.find((c) => c && c.type === "text" && typeof c.text === "string");
  return t ? t.text.trim() : "";
}

function cleanReplyText(text = "") {
  return text.replace(/^\[\[\s*reply_to[^\]]*\]\]\s*/i, "").trim();
}

function parseArguments(raw) {
  if (!raw) return {};
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function loadCommands() {
  return readJson(COMMANDS_FILE, []);
}

function saveCommands(commands) {
  writeJson(COMMANDS_FILE, commands.slice(-300));
}

function normalizeUserCommand(text = "") {
  const t = String(text || "").trim();
  if (!t) return "";
  if (t.startsWith("Conversation info (untrusted metadata):")) return "";
  if (t.startsWith("Sender (untrusted metadata):")) return "";
  if (t.startsWith("[media attached")) return "";
  if (t.startsWith("[message_id:")) return "";
  return t;
}

function updateCommandFromEvent(evt) {
  const commands = loadCommands();

  if (evt.event === "user.request") {
    const note = normalizeUserCommand(evt.payload?.out || "");
    if (!note) return;

    const recent = [...commands].reverse().find((c) => c.note === note && Math.abs((c.ts || 0) - Date.now()) < 120000);
    if (recent) {
      recent.status = recent.status === "done" ? "done" : "running";
      recent.progress = Math.max(recent.progress || 0, 16);
      recent.lastEvent = "用户命令已进入队列";
      recent.updatedAt = Date.now();
      saveCommands(commands);
      broadcast({ event: "command.updated", payload: recent });
      return;
    }

    const cmd = {
      id: crypto.randomUUID(),
      ts: Date.now(),
      action: "inbound_user_command",
      note,
      sessionKey: "agent:main:main",
      source: "feishu",
      status: "running",
      progress: 12,
      lastEvent: "用户命令已接收",
      updatedAt: Date.now()
    };
    commands.push(cmd);
    saveCommands(commands);
    broadcast({ event: "command.updated", payload: cmd });
    return;
  }

  const target = [...commands].reverse().find((c) => c.status === "queued" || c.status === "running");
  if (!target) return;

  target.updatedAt = Date.now();
  target.lastEvent = evt.title || evt.event;

  if (evt.event === "tool.error" || evt.event === "session.failed") {
    target.status = "failed";
    target.progress = Math.min(target.progress, 95);
    target.result = evt.payload?.out || "执行失败";
  } else if (evt.event === "step.completed" || evt.event === "tool.completed") {
    target.status = "running";
    target.progress = Math.min(95, target.progress + 22);
  } else if (evt.event === "step.started" || evt.event === "tool.started") {
    target.status = "running";
    target.progress = Math.min(90, Math.max(18, target.progress + 14));
  } else if (evt.event === "control.applied") {
    target.status = "running";
    target.progress = Math.min(90, target.progress + 10);
  }

  if ((evt.event === "step.started" && (evt.title || "").includes("生成回复")) || evt.event === "assistant.reply") {
    target.status = "done";
    target.progress = 100;
    target.result = "收到助手回复，命令完成";
  }

  saveCommands(commands);
  broadcast({ event: "command.updated", payload: target });
}

function dispatchToOpenClaw(sessionKey, message) {
  const meta = findSessionMeta(sessionKey);
  if (!meta || !meta.sessionId || !message) return false;

  const args = ["agent", "--session-id", meta.sessionId, "--message", message, "--deliver"];
  const dc = meta.deliveryContext || {};
  if (dc.channel) args.push("--reply-channel", String(dc.channel));
  if (dc.to) args.push("--reply-to", String(dc.to));
  if (dc.accountId) args.push("--reply-account", String(dc.accountId));

  const p = spawn("openclaw", args, { detached: true, stdio: "ignore" });
  p.unref();
  return true;
}

function parseLine(line) {
  let row;
  try {
    row = JSON.parse(line);
  } catch {
    return [];
  }

  const out = [];
  if (!row || row.type !== "message" || !row.message) return out;
  const msg = row.message;
  const role = msg.role;

  if (role === "assistant") {
    const text = cleanReplyText(firstText(msg.content));
    if (text && text !== "NO_REPLY") {
      out.push({ event: "step.started", title: "生成回复", risk: "low", payload: { agentId: "agent-main", why: "回应用户", out: text.slice(0, 240), next: "等待后续消息" } });
      out.push({ event: "assistant.reply", title: "消息已发送", risk: "low", payload: { agentId: "agent-main", out: text.slice(0, 240) } });
    }

    if (Array.isArray(msg.content)) {
      for (const item of msg.content) {
        if (!item || item.type !== "toolCall") continue;
        const args = parseArguments(item.arguments);
        const tool = item.name || "tool";
        const hint = args.path || args.filePath || args.file_path || "";
        out.push({ event: "tool.started", title: `调用工具: ${tool}`, risk: ["exec", "message"].includes(tool) ? "medium" : "low", payload: { agentId: mapAgent(tool), why: "执行步骤", out: hint ? `${tool} -> ${hint}` : `${tool} 执行中`, next: "等待工具输出" } });
      }
    }

    if (msg.usage) {
      out.push({ event: "cost.updated", payload: { tokens: msg.usage.totalTokens || 0, cost: msg.usage.cost?.total || 0, retry: 0 } });
    }
  }

  if (role === "toolResult") {
    const tool = msg.toolName || "tool";
    const txt = firstText(msg.content) || "工具执行完成";
    out.push({ event: msg.isError ? "tool.error" : "tool.completed", title: `${tool} ${msg.isError ? "失败" : "完成"}`, risk: msg.isError ? "high" : "low", payload: { agentId: mapAgent(tool), why: "工具返回", out: txt.slice(0, 240), next: msg.isError ? "重试或人工介入" : "继续后续步骤" } });

    const m = txt.match(/Successfully wrote \d+ bytes to (.+)$/);
    if (m && m[1]) {
      out.push({ event: "artifact.created", payload: { name: path.basename(m[1]) } });
      out.push({ event: "file.changed", payload: { path: m[1] } });
    }
  }

  if (role === "user") {
    const text = normalizeUserCommand(firstText(msg.content));
    out.push({ event: "queue.updated", payload: { agentId: "agent-main", items: ["理解用户新请求", "规划下一步执行"] } });
    if (text) {
      out.push({ event: "user.request", title: "收到用户命令", payload: { out: text.slice(0, 180) } });
    }
  }

  return out;
}

function sseWrite(res, data) {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

function recentEvents(sessionFile, limit = 120) {
  if (!sessionFile || !fs.existsSync(sessionFile)) return [];
  try {
    const lines = fs.readFileSync(sessionFile, "utf8").trim().split("\n");
    const out = [];
    for (const line of lines.slice(-Math.max(limit, 40))) {
      const events = parseLine(line);
      for (const e of events) {
        out.push({ ...e, _ts: Date.now() });
      }
    }
    return out.slice(-limit);
  } catch {
    return [];
  }
}

function broadcast(data) {
  for (const client of LIVE_CLIENTS) {
    try {
      sseWrite(client, data);
    } catch {
      // stale
    }
  }
}

function streamSessionEvents(res, sessionFile) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*"
  });

  LIVE_CLIENTS.add(res);
  sseWrite(res, { event: "session.started" });

  const cmds = loadCommands().slice(-30);
  for (const c of cmds) sseWrite(res, { event: "command.updated", payload: c });

  let offset = 0;
  let pending = "";

  function emitEvents(events) {
    for (const e of events) {
      sseWrite(res, e);
      updateCommandFromEvent(e);
    }
  }

  function readNew() {
    if (!fs.existsSync(sessionFile)) return;
    const stat = fs.statSync(sessionFile);
    if (stat.size < offset) offset = 0;
    if (stat.size === offset) return;

    const fd = fs.openSync(sessionFile, "r");
    const size = stat.size - offset;
    const buf = Buffer.alloc(size);
    fs.readSync(fd, buf, 0, size, offset);
    fs.closeSync(fd);
    offset = stat.size;

    const raw = pending + buf.toString("utf8");
    const lines = raw.split("\n");
    pending = lines.pop() || "";

    for (const line of lines) {
      if (!line.trim()) continue;
      emitEvents(parseLine(line));
    }
  }

  try {
    if (fs.existsSync(sessionFile)) {
      const all = fs.readFileSync(sessionFile, "utf8").trim().split("\n");
      for (const line of all.slice(-50)) emitEvents(parseLine(line));
      offset = fs.statSync(sessionFile).size;
    }
  } catch {
    // ignore
  }

  const timer = setInterval(readNew, 800);
  const heartbeat = setInterval(() => res.write(": ping\n\n"), 15000);
  res.on("close", () => {
    LIVE_CLIENTS.delete(res);
    clearInterval(timer);
    clearInterval(heartbeat);
  });
}

function getSkill(name) {
  return SKILLS.find((s) => s.name === name) || null;
}

function safeReadText(file, max = 30000) {
  try {
    const txt = fs.readFileSync(file, "utf8");
    return txt.length > max ? `${txt.slice(0, max)}\n\n...truncated...` : txt;
  } catch {
    return "";
  }
}

function listSkillFiles(skill) {
  const dir = path.dirname(skill.location);
  try {
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isFile())
      .map((d) => d.name)
      .filter((n) => n.endsWith(".md") || n.endsWith(".js") || n.endsWith(".mjs") || n.endsWith(".json") || n.endsWith(".txt") || n.endsWith(".yaml") || n.endsWith(".yml"))
      .slice(0, 50);
  } catch {
    return [];
  }
}

function safeSkillFile(skill, rel) {
  const dir = path.dirname(skill.location);
  const target = path.normalize(path.join(dir, rel || ""));
  if (!target.startsWith(dir)) return null;
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) return null;
  return target;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  if (req.method === "OPTIONS") {
    return send(res, 204, "", {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
  }

  if (url.pathname === "/auth/login" && req.method === "POST") {
    try {
      const body = JSON.parse((await readBody(req)) || "{}");
      if (body.username !== AUTH_USER || body.password !== AUTH_PASS) {
        return send(res, 401, JSON.stringify({ error: "invalid credentials" }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
      }
      const token = createAuthToken();
      return send(res, 200, JSON.stringify({ ok: true }), {
        "Content-Type": MIME[".json"],
        "Set-Cookie": `${AUTH_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`,
        "Access-Control-Allow-Origin": "*"
      });
    } catch {
      return send(res, 400, JSON.stringify({ error: "invalid request" }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
    }
  }

  if (url.pathname === "/auth/me" && req.method === "GET") {
    return send(res, 200, JSON.stringify({ authed: isAuthed(req) }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
  }

  if (url.pathname === "/auth/logout" && req.method === "POST") {
    const token = parseCookies(req.headers.cookie || "")[AUTH_COOKIE];
    if (token) TOKENS.delete(token);
    return send(res, 200, JSON.stringify({ ok: true }), {
      "Content-Type": MIME[".json"],
      "Set-Cookie": `${AUTH_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`,
      "Access-Control-Allow-Origin": "*"
    });
  }

  if (url.pathname === "/health") {
    return send(res, 200, JSON.stringify({ ok: true }), { "Content-Type": MIME[".json"] });
  }

  const apiReq = url.pathname.startsWith("/api/");
  const publicPath = url.pathname === "/login.html";
  if (!publicPath && !isAuthed(req)) {
    if (apiReq) return send(res, 401, JSON.stringify({ error: "unauthorized" }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
    return send(res, 302, "", { Location: "/login.html" });
  }

  if (url.pathname === "/api/skills" && req.method === "GET") {
    return send(res, 200, JSON.stringify({ items: SKILLS.map((s) => ({ name: s.name, description: s.description, location: s.location })) }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
  }

  if (url.pathname === "/api/skills/detail" && req.method === "GET") {
    const skill = getSkill(url.searchParams.get("name") || "");
    if (!skill) return send(res, 404, JSON.stringify({ error: "skill not found" }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
    return send(res, 200, JSON.stringify({ skill, content: safeReadText(skill.location), files: listSkillFiles(skill) }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
  }

  if (url.pathname === "/api/skills/source" && req.method === "GET") {
    const skill = getSkill(url.searchParams.get("name") || "");
    if (!skill) return send(res, 404, JSON.stringify({ error: "skill not found" }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
    const target = safeSkillFile(skill, url.searchParams.get("file") || "");
    if (!target) return send(res, 404, JSON.stringify({ error: "file not found" }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
    return send(res, 200, JSON.stringify({ file: path.basename(target), content: safeReadText(target, 50000) }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
  }

  if (url.pathname === "/api/commands" && req.method === "GET") {
    return send(res, 200, JSON.stringify({ items: loadCommands().slice(-100) }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
  }

  if (url.pathname === "/api/events/recent" && req.method === "GET") {
    const sessionKey = url.searchParams.get("sessionKey") || "agent:main:main";
    const n = Number(url.searchParams.get("limit") || 120);
    const items = recentEvents(findSessionFile(sessionKey), Math.min(Math.max(n, 20), 300));
    return send(res, 200, JSON.stringify({ items }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
  }

  if (url.pathname === "/api/approvals" && req.method === "GET") {
    const out = [];
    try {
      if (fs.existsSync(APPROVAL_LOG)) {
        const lines = fs.readFileSync(APPROVAL_LOG, "utf8").trim().split("\n");
        for (const line of lines.slice(-100)) if (line.trim()) out.push(JSON.parse(line));
      }
    } catch {
      // ignore
    }
    return send(res, 200, JSON.stringify({ items: out }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
  }

  if (url.pathname === "/api/approvals" && req.method === "POST") {
    try {
      const body = JSON.parse((await readBody(req)) || "{}");
      const decision = { ts: Date.now(), action: body.action === "approve" ? "approve" : "deny", reason: String(body.reason || "manual decision"), source: "ops-studio" };
      fs.mkdirSync(RUNTIME_DIR, { recursive: true });
      fs.appendFileSync(APPROVAL_LOG, `${JSON.stringify(decision)}\n`);

      const evt = {
        event: decision.action === "approve" ? "approval.granted" : "approval.denied",
        title: decision.action === "approve" ? "审批通过" : "审批拒绝",
        risk: decision.action === "approve" ? "low" : "medium",
        payload: { agentId: "agent-main", why: "人工审批", out: decision.reason, next: decision.action === "approve" ? "继续执行" : "终止或改写方案" }
      };
      broadcast(evt);
      updateCommandFromEvent(evt);
      return send(res, 200, JSON.stringify({ ok: true, decision }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
    } catch (err) {
      return send(res, 400, JSON.stringify({ error: err.message || "invalid request" }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
    }
  }

  if (url.pathname === "/api/control" && req.method === "POST") {
    try {
      const body = JSON.parse((await readBody(req)) || "{}");
      const action = String(body.action || "noop");
      const note = String(body.note || "");
      const sessionKey = String(body.sessionKey || "agent:main:main");
      const cmd = { id: crypto.randomUUID(), ts: Date.now(), action, note, sessionKey, source: "ops-studio", status: "queued", progress: 6, lastEvent: "命令已接收" };

      const commands = loadCommands();
      commands.push(cmd);
      saveCommands(commands);

      fs.mkdirSync(RUNTIME_DIR, { recursive: true });
      fs.appendFileSync(CONTROL_LOG, `${JSON.stringify(cmd)}\n`);

      let dispatched = false;
      if ((action === "dispatch_command" || action === "dispatch_command_urgent") && note.trim()) {
        dispatched = dispatchToOpenClaw(sessionKey, note.trim());
        cmd.status = dispatched ? "running" : "queued";
        cmd.progress = dispatched ? 18 : 6;
        cmd.lastEvent = dispatched ? "已转发到真实会话" : "未找到可转发会话";
      } else {
        cmd.status = "running";
        cmd.progress = 20;
        cmd.lastEvent = "控制策略已应用";
      }
      cmd.updatedAt = Date.now();
      saveCommands(commands);

      const evt = {
        event: "control.applied",
        title: `控制指令: ${action}`,
        risk: "medium",
        payload: {
          agentId: "agent-main",
          why: "用户在控制台下发调度指令",
          out: note ? `${action} (${note})` : action,
          next: dispatched ? "已转发到真实会话执行" : "按新策略继续执行"
        }
      };
      broadcast(evt);
      broadcast({ event: "command.updated", payload: cmd });

      return send(res, 200, JSON.stringify({ ok: true, command: cmd, dispatched }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
    } catch (err) {
      return send(res, 400, JSON.stringify({ error: err.message || "invalid request" }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
    }
  }

  if (url.pathname === "/api/agent-events") {
    const sessionKey = url.searchParams.get("sessionKey") || "agent:main:main";
    const sessionFile = findSessionFile(sessionKey);
    if (!sessionFile) return send(res, 404, JSON.stringify({ error: "session file not found" }), { "Content-Type": MIME[".json"], "Access-Control-Allow-Origin": "*" });
    return streamSessionEvents(res, sessionFile);
  }

  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = path.normalize(requested).replace(/^\/+/, "");
  const filePath = path.join(__dirname, safePath);
  if (!filePath.startsWith(__dirname)) return send(res, 403, "Forbidden");

  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, "Not Found");
    send(res, 200, data, { "Content-Type": MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`agent-visibility server listening on :${PORT}`);
});
