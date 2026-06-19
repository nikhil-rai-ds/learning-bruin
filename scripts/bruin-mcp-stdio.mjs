#!/usr/bin/env node

import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const bruinProjectDir = join(projectRoot, "bruin", "bruin-chess");

const bruin = spawn("bruin", ["mcp"], {
  cwd: bruinProjectDir,
  stdio: ["pipe", "pipe", "pipe"],
});

let clientBuffer = Buffer.alloc(0);
let bruinBuffer = "";

function writeFrame(message) {
  const body = JSON.stringify(message);
  process.stdout.write(`Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`);
}

function parseClientFrames() {
  while (clientBuffer.length > 0) {
    const headerEnd = clientBuffer.indexOf("\r\n\r\n");
    if (headerEnd === -1) {
      return;
    }

    const header = clientBuffer.subarray(0, headerEnd).toString("utf8");
    const match = /content-length:\s*(\d+)/i.exec(header);
    if (!match) {
      process.stderr.write(`Invalid MCP frame header from client: ${header}\n`);
      process.exitCode = 1;
      bruin.kill();
      return;
    }

    const contentLength = Number.parseInt(match[1], 10);
    const bodyStart = headerEnd + 4;
    const bodyEnd = bodyStart + contentLength;
    if (clientBuffer.length < bodyEnd) {
      return;
    }

    const body = clientBuffer.subarray(bodyStart, bodyEnd).toString("utf8");
    bruin.stdin.write(`${body}\n`);
    clientBuffer = clientBuffer.subarray(bodyEnd);
  }
}

process.stdin.on("data", (chunk) => {
  clientBuffer = Buffer.concat([clientBuffer, chunk]);
  parseClientFrames();
});

bruin.stdout.on("data", (chunk) => {
  bruinBuffer += chunk.toString("utf8");

  while (true) {
    const newline = bruinBuffer.indexOf("\n");
    if (newline === -1) {
      return;
    }

    const line = bruinBuffer.slice(0, newline).trim();
    bruinBuffer = bruinBuffer.slice(newline + 1);
    if (!line) {
      continue;
    }

    try {
      writeFrame(JSON.parse(line));
    } catch (error) {
      process.stderr.write(`Invalid JSON from bruin mcp: ${line}\n${error}\n`);
    }
  }
});

bruin.stderr.on("data", (chunk) => {
  process.stderr.write(chunk);
});

bruin.on("exit", (code, signal) => {
  if (signal) {
    process.exit(signal === "SIGINT" ? 130 : 143);
    return;
  }

  process.exit(code ?? 0);
});

process.stdin.on("end", () => bruin.stdin.end());

function shutdown(signal) {
  bruin.kill(signal);
  setTimeout(() => {
    process.exit(signal === "SIGINT" ? 130 : 143);
  }, 1000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
