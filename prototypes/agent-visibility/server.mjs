import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 8787);

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

function streamEvents(res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*"
  });

  const events = [
    { event: "session.started" },
    { event: "queue.updated", payload: { agentId: "agent-r1", items: ["检索官网", "提炼要点"] } },
    { event: "step.started", title: "检索官网", payload: { agentId: "agent-r1", why: "补充事实依据", out: "抓取公开资料", next: "提炼要点", risk: "low" } },
    { event: "cost.updated", payload: { tokens: 620, cost: 0.0031, retry: 0 } },
    { event: "step.completed", payload: { agentId: "agent-r1" } },
    { event: "queue.updated", payload: { agentId: "agent-r2", items: ["更新 UI", "回归检查"] } },
    { event: "step.started", title: "更新 UI", payload: { agentId: "agent-r2", why: "实现动画工坊", out: "写入 index.html", next: "回归检查", risk: "medium" } },
    { event: "artifact.created", payload: { name: "index.html" } },
    { event: "step.started", title: "定时任务: 状态巡检", payload: { agentId: "agent-main", why: "cron 触发", out: "执行巡检", next: "恢复待命", risk: "low", scheduled: true } },
    { event: "approval.required", payload: { reason: "外部消息发送" } },
    { event: "step.started", title: "申请高风险操作确认", payload: { agentId: "agent-main", why: "外部写入", out: "等待审批", next: "审批后执行", risk: "high" } },
    { event: "session.completed" }
  ];

  let i = 0;
  const timer = setInterval(() => {
    const data = events[i % events.length];
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    i += 1;
  }, 2200);

  const heartbeat = setInterval(() => {
    res.write(": ping\n\n");
  }, 15000);

  res.on("close", () => {
    clearInterval(timer);
    clearInterval(heartbeat);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  if (url.pathname === "/health") {
    return send(res, 200, JSON.stringify({ ok: true }), { "Content-Type": MIME[".json"] });
  }

  if (url.pathname === "/api/agent-events") {
    return streamEvents(res);
  }

  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = path.normalize(requested).replace(/^\/+/, "");
  const filePath = path.join(__dirname, safePath);

  if (!filePath.startsWith(__dirname)) {
    return send(res, 403, "Forbidden");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return send(res, 404, "Not Found");
    }
    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, { "Content-Type": MIME[ext] || "application/octet-stream" });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`agent-visibility server listening on :${PORT}`);
});
