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
const APPROVAL_LOG = path.join(__dirname, ".runtime", "approvals.jsonl");
const CONTROL_LOG = path.join(__dirname, ".runtime", "controls.jsonl");
const LIVE_CLIENTS = new Set();
const AUTH_USER = "admin";
const AUTH_PASS = "Ak#123456";
const AUTH_COOKIE = "studio_auth";
const AUTH_TTL_MS = 1000 * 60 * 60 * 24;
const TOKENS = new Map();

const SKILLS = [
  {
    name: "feishu-doc",
    description: "Feishu document read/write operations.",
    location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/extensions/feishu/skills/feishu-doc/SKILL.md"
  },
  {
    name: "feishu-drive",
    description: "Feishu cloud storage file management.",
    location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/extensions/feishu/skills/feishu-drive/SKILL.md"
  },
  {
    name: "feishu-perm",
    description: "Feishu permission management.",
    location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/extensions/feishu/skills/feishu-perm/SKILL.md"
  },
  {
    name: "feishu-wiki",
    description: "Feishu knowledge base navigation.",
    location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/extensions/feishu/skills/feishu-wiki/SKILL.md"
  },
  {
    name: "healthcheck",
    description: "OpenClaw host security hardening checks.",
    location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/skills/healthcheck/SKILL.md"
  },
  {
    name: "skill-creator",
    description: "Create or update AgentSkills.",
    location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/skills/skill-creator/SKILL.md"
  },
  {
    name: "tmux",
    description: "Remote-control tmux sessions for interactive CLIs.",
    location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/skills/tmux/SKILL.md"
  },
  {
    name: "weather",
    description: "Current weather and forecasts via wttr.in/Open-Meteo.",
    location: "/home/ubuntu/.npm-global/lib/node_modules/openclaw/skills/weather/SKILL.md"
  },
  {
    name: "auto-updater",
    description: "Automatically update Clawdbot and installed skills.",
    location: "/home/ubuntu/.openclaw/workspace/skills/auto-updater/SKILL.md"
  },
  {
    name: "browserwing-executor",
    description: "Control browser automation through HTTP API.",
    location: "/home/ubuntu/.openclaw/workspace/skills/browserwing-executor/SKILL.md"
  },
  {
    name: "skill-vetter",
    description: "Security-first skill vetting for AI agents.",
    location: "/home/ubuntu/.openclaw/workspace/skills/skill-vetter/SKILL.md"
  }
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function send(res, code, body, headers = {}) {
  res.writeHead(code, headers);
  res.end(body);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function findSessionMeta(sessionKey) {
  const all = readJson(OPENCLAW_SESSIONS);
  if (!all || typeof all !== "object") return null;

  if (sessionKey && all[sessionKey]) return all[sessionKey];

  let selected = null;
  for (const [key, value] of Object.entries(all)) {
    if (!key.startsWith("agent:main:")) continue;
    if (!value || !value.sessionFile) continue;
    if (!selected || (value.updatedAt || 0) > (selected.updatedAt || 0)) {
      selected = value;
    }
  }
  return selected;
}

function findSessionFile(sessionKey) {
  const meta = findSessionMeta(sessionKey);
  return meta ? meta.sessionFile : null;
}

function mapAgent(toolName) {
  if (!toolName) return "agent-main";
  if (["web_search", "web_fetch", "read", "image", "pdf"].includes(toolName)) return "agent-r1";
  if (["write", "edit", "exec", "browser", "canvas"].includes(toolName)) return "agent-r2";
  return "agent-main";
}

function firstText(content) {
  if (!Array.isArray(content)) return "";
  const item = content.find((c) => c && c.type === "text" && typeof c.text === "string");
  return item ? item.text.trim() : "";
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
    const text = firstText(msg.content);
    if (text && !text.startsWith("[[reply_to_current]]") && text !== "NO_REPLY") {
      out.push({
        event: "step.started",
        title: "生成回复",
        risk: "low",
        payload: {
          agentId: "agent-main",
          why: "对用户请求进行回应",
          out: text.slice(0, 240),
          next: "等待后续工具或用户消息"
        }
      });
    }

    if (Array.isArray(msg.content)) {
      for (const item of msg.content) {
        if (!item || item.type !== "toolCall") continue;
        const args = parseArguments(item.arguments);
        const tool = item.name || "tool";
        const pathHint = args.path || args.filePath || args.file_path || "";
        out.push({
          event: "tool.started",
          title: `调用工具: ${tool}`,
          risk: ["exec", "message"].includes(tool) ? "medium" : "low",
          payload: {
            agentId: mapAgent(tool),
            why: "执行当前步骤所需操作",
            out: pathHint ? `${tool} -> ${pathHint}` : `${tool} 执行中`,
            next: "等待工具输出",
            tool,
            path: pathHint
          }
        });
      }
    }

    if (msg.usage) {
      out.push({
        event: "cost.updated",
        payload: {
          tokens: msg.usage.totalTokens || 0,
          cost: msg.usage.cost?.total || 0,
          retry: 0
        }
      });
    }
  }

  if (role === "toolResult") {
    const tool = msg.toolName || "tool";
    const txt = firstText(msg.content) || "工具执行完成";
    out.push({
      event: msg.isError ? "tool.error" : "tool.completed",
      title: `${tool} ${msg.isError ? "失败" : "完成"}`,
      risk: msg.isError ? "high" : "low",
      payload: {
        agentId: mapAgent(tool),
        why: "工具返回结果",
        out: txt.slice(0, 240),
        next: msg.isError ? "重试或人工介入" : "继续后续步骤",
        tool
      }
    });

    const m = txt.match(/Successfully wrote \d+ bytes to (.+)$/);
    if (m && m[1]) {
      out.push({ event: "artifact.created", payload: { name: path.basename(m[1]) } });
      out.push({ event: "file.changed", payload: { path: m[1] } });
    }
  }

  if (role === "user") {
    out.push({
      event: "queue.updated",
      payload: { agentId: "agent-main", items: ["理解用户新请求", "规划下一步执行"] }
    });
  }

  return out;
}

function sseWrite(res, data) {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

function broadcast(data) {
  for (const client of LIVE_CLIENTS) {
    try {
      sseWrite(client, data);
    } catch {
      // ignore stale clients
    }
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk.toString("utf8");
      if (raw.length > 1024 * 1024) {
        reject(new Error("payload too large"));
      }
    });
    req.on("end", () => resolve(raw));
    req.on("error", reject);
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
    const names = fs.readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isFile())
      .map((d) => d.name)
      .filter((n) => n.endsWith(".md") || n.endsWith(".js") || n.endsWith(".mjs") || n.endsWith(".json") || n.endsWith(".txt") || n.endsWith(".yaml") || n.endsWith(".yml"))
      .slice(0, 50);
    return names;
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

function parseCookies(cookie = "") {
  const out = {};
  for (const part of cookie.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    out[k] = decodeURIComponent(v);
  }
  return out;
}

function createAuthToken() {
  const token = crypto.randomBytes(24).toString("hex");
  TOKENS.set(token, Date.now() + AUTH_TTL_MS);
  return token;
}

function isAuthed(req) {
  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies[AUTH_COOKIE];
  if (!token) return false;
  const exp = TOKENS.get(token);
  if (!exp || exp < Date.now()) {
    TOKENS.delete(token);
    return false;
  }
  return true;
}

function sendUnauthorized(res, api = false) {
  if (api) {
    return send(res, 401, JSON.stringify({ error: "unauthorized" }), {
      "Content-Type": MIME[".json"],
      "Access-Control-Allow-Origin": "*"
    });
  }
  return send(res, 302, "", { Location: "/login.html" });
}

function dispatchToOpenClaw(sessionKey, message) {
  const meta = findSessionMeta(sessionKey);
  if (!meta || !meta.sessionId || !message) return false;

  const p = spawn(
    "openclaw",
    ["agent", "--session-id", meta.sessionId, "--message", message],
    { detached: true, stdio: "ignore" }
  );
  p.unref();
  return true;
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

  let offset = 0;
  let pending = "";

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
      const events = parseLine(line);
      for (const e of events) sseWrite(res, e);
    }
  }

  // Initial replay of recent lines so the UI is not empty.
  try {
    if (fs.existsSync(sessionFile)) {
      const all = fs.readFileSync(sessionFile, "utf8").trim().split("\n");
      const seed = all.slice(-40);
      for (const line of seed) {
        const events = parseLine(line);
        for (const e of events) sseWrite(res, e);
      }
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
      const raw = await readBody(req);
      const body = raw ? JSON.parse(raw) : {};
      if (body.username !== AUTH_USER || body.password !== AUTH_PASS) {
        return send(res, 401, JSON.stringify({ error: "invalid credentials" }), {
          "Content-Type": MIME[".json"],
          "Access-Control-Allow-Origin": "*"
        });
      }
      const token = createAuthToken();
      return send(res, 200, JSON.stringify({ ok: true }), {
        "Content-Type": MIME[".json"],
        "Set-Cookie": `${AUTH_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`,
        "Access-Control-Allow-Origin": "*"
      });
    } catch {
      return send(res, 400, JSON.stringify({ error: "invalid request" }), {
        "Content-Type": MIME[".json"],
        "Access-Control-Allow-Origin": "*"
      });
    }
  }

  if (url.pathname === "/auth/me" && req.method === "GET") {
    return send(res, 200, JSON.stringify({ authed: isAuthed(req) }), {
      "Content-Type": MIME[".json"],
      "Access-Control-Allow-Origin": "*"
    });
  }

  if (url.pathname === "/auth/logout" && req.method === "POST") {
    const cookies = parseCookies(req.headers.cookie || "");
    if (cookies[AUTH_COOKIE]) TOKENS.delete(cookies[AUTH_COOKIE]);
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
  const publicPath = url.pathname === "/login.html" || url.pathname === "/auth/login" || url.pathname === "/auth/me" || url.pathname === "/auth/logout" || url.pathname === "/health";
  if (!publicPath && !isAuthed(req)) {
    return sendUnauthorized(res, apiReq);
  }

  if (url.pathname === "/api/skills" && req.method === "GET") {
    const items = SKILLS.map((s) => ({ name: s.name, description: s.description, location: s.location }));
    return send(res, 200, JSON.stringify({ items }), {
      "Content-Type": MIME[".json"],
      "Access-Control-Allow-Origin": "*"
    });
  }

  if (url.pathname === "/api/skills/detail" && req.method === "GET") {
    const name = url.searchParams.get("name") || "";
    const skill = getSkill(name);
    if (!skill) {
      return send(res, 404, JSON.stringify({ error: "skill not found" }), {
        "Content-Type": MIME[".json"],
        "Access-Control-Allow-Origin": "*"
      });
    }
    const content = safeReadText(skill.location);
    const files = listSkillFiles(skill);
    return send(res, 200, JSON.stringify({ skill, content, files }), {
      "Content-Type": MIME[".json"],
      "Access-Control-Allow-Origin": "*"
    });
  }

  if (url.pathname === "/api/skills/source" && req.method === "GET") {
    const name = url.searchParams.get("name") || "";
    const file = url.searchParams.get("file") || "";
    const skill = getSkill(name);
    if (!skill) {
      return send(res, 404, JSON.stringify({ error: "skill not found" }), {
        "Content-Type": MIME[".json"],
        "Access-Control-Allow-Origin": "*"
      });
    }
    const target = safeSkillFile(skill, file);
    if (!target) {
      return send(res, 404, JSON.stringify({ error: "file not found" }), {
        "Content-Type": MIME[".json"],
        "Access-Control-Allow-Origin": "*"
      });
    }
    return send(res, 200, JSON.stringify({ file, content: safeReadText(target, 50000) }), {
      "Content-Type": MIME[".json"],
      "Access-Control-Allow-Origin": "*"
    });
  }

  if (url.pathname === "/api/approvals" && req.method === "GET") {
    const out = [];
    try {
      if (fs.existsSync(APPROVAL_LOG)) {
        const lines = fs.readFileSync(APPROVAL_LOG, "utf8").trim().split("\n");
        for (const line of lines.slice(-100)) {
          if (!line.trim()) continue;
          out.push(JSON.parse(line));
        }
      }
    } catch {
      // ignore
    }
    return send(res, 200, JSON.stringify({ items: out }), {
      "Content-Type": MIME[".json"],
      "Access-Control-Allow-Origin": "*"
    });
  }

  if (url.pathname === "/api/approvals" && req.method === "POST") {
    try {
      const raw = await readBody(req);
      const body = raw ? JSON.parse(raw) : {};
      const decision = {
        ts: Date.now(),
        action: body.action === "approve" ? "approve" : "deny",
        reason: String(body.reason || "manual decision"),
        source: "ops-studio"
      };
      fs.mkdirSync(path.dirname(APPROVAL_LOG), { recursive: true });
      fs.appendFileSync(APPROVAL_LOG, `${JSON.stringify(decision)}\n`);

      const evt = {
        event: decision.action === "approve" ? "approval.granted" : "approval.denied",
        title: decision.action === "approve" ? "审批通过" : "审批拒绝",
        risk: decision.action === "approve" ? "low" : "medium",
        payload: {
          agentId: "agent-main",
          why: "人工审批",
          out: decision.reason,
          next: decision.action === "approve" ? "继续执行" : "终止或改写方案"
        }
      };
      broadcast(evt);
      return send(res, 200, JSON.stringify({ ok: true, decision }), {
        "Content-Type": MIME[".json"],
        "Access-Control-Allow-Origin": "*"
      });
    } catch (err) {
      return send(res, 400, JSON.stringify({ error: err.message || "invalid request" }), {
        "Content-Type": MIME[".json"],
        "Access-Control-Allow-Origin": "*"
      });
    }
  }

  if (url.pathname === "/api/control" && req.method === "POST") {
    try {
      const raw = await readBody(req);
      const body = raw ? JSON.parse(raw) : {};
      const action = String(body.action || "noop");
      const note = String(body.note || "");
      const sessionKey = String(body.sessionKey || "agent:main:main");
      const cmd = { ts: Date.now(), action, note, sessionKey, source: "ops-studio" };
      fs.mkdirSync(path.dirname(CONTROL_LOG), { recursive: true });
      fs.appendFileSync(CONTROL_LOG, `${JSON.stringify(cmd)}\n`);

      let dispatched = false;
      if ((action === "dispatch_command" || action === "dispatch_command_urgent") && note.trim()) {
        dispatched = dispatchToOpenClaw(sessionKey, note.trim());
      }

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
      return send(res, 200, JSON.stringify({ ok: true, command: cmd, dispatched }), {
        "Content-Type": MIME[".json"],
        "Access-Control-Allow-Origin": "*"
      });
    } catch (err) {
      return send(res, 400, JSON.stringify({ error: err.message || "invalid request" }), {
        "Content-Type": MIME[".json"],
        "Access-Control-Allow-Origin": "*"
      });
    }
  }

  if (url.pathname === "/api/agent-events") {
    const sessionKey = url.searchParams.get("sessionKey") || "agent:main:main";
    const sessionFile = findSessionFile(sessionKey);
    if (!sessionFile) {
      return send(res, 404, JSON.stringify({ error: "session file not found" }), {
        "Content-Type": MIME[".json"]
      });
    }
    return streamSessionEvents(res, sessionFile);
  }

  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = path.normalize(requested).replace(/^\/+/, "");
  const filePath = path.join(__dirname, safePath);

  if (!filePath.startsWith(__dirname)) return send(res, 403, "Forbidden");

  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, "Not Found");
    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, { "Content-Type": MIME[ext] || "application/octet-stream" });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`agent-visibility server listening on :${PORT}`);
});
