import { createServer } from "http";
import { existsSync, readFileSync } from "fs";
import { extname, join } from "path";

const PORT = process.env.PORT || 3000;
const DIST = join(process.cwd(), "dist");

const types = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

createServer((req, res) => {
  let filePath = join(DIST, decodeURIComponent(req.url.split("?")[0]));
  if (!existsSync(filePath) || filePath.endsWith("/")) {
    filePath = join(DIST, "index.html");
  }
  try {
    const data = readFileSync(filePath);
    res.writeHead(200, { "Content-Type": types[extname(filePath)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(PORT, () => console.log(`Serving dist on port ${PORT}`));
