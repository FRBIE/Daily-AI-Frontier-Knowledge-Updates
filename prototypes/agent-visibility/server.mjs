import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 8787);
const OPENCLAW_SESSIONS = "/home/ubuntu/.openclaw/agents/main/sessions/sessions.json";
const APPROVAL_LOG = path.join(__dirname, ".runtime", "approvals.jsonl");
const CONTROL_LOG = path.join(__dirname, ".runtime", "controls.jsonl");
const LIVE_CLIENTS = new Set();

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

function findSessionFile(sessionKey) {
  const all = readJson(OPENCLAW_SESSIONS);
  if (!all || typeof all !== "object") return null;

  if (sessionKey && all[sessionKey] && all[sessionKey].sessionFile) {
    return all[sessionKey].sessionFile;
  }

  let selected = null;
  for (const [key, value] of Object.entries(all)) {
    if (!key.startsWith("agent:main:")) continue;
    if (!value || !value.sessionFile) continue;
    if (!selected || (value.updatedAt || 0) > (selected.updatedAt || 0)) {
      selected = value;
    }
  }
  return selected ? selected.sessionFile : null;
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

  if (url.pathname === "/health") {
    return send(res, 200, JSON.stringify({ ok: true }), { "Content-Type": MIME[".json"] });
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
      const cmd = { ts: Date.now(), action, note, source: "ops-studio" };
      fs.mkdirSync(path.dirname(CONTROL_LOG), { recursive: true });
      fs.appendFileSync(CONTROL_LOG, `${JSON.stringify(cmd)}\n`);

      const evt = {
        event: "control.applied",
        title: `控制指令: ${action}`,
        risk: "medium",
        payload: {
          agentId: "agent-main",
          why: "用户在控制台下发调度指令",
          out: note ? `${action} (${note})` : action,
          next: "按新策略继续执行"
        }
      };
      broadcast(evt);
      return send(res, 200, JSON.stringify({ ok: true, command: cmd }), {
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
