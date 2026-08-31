#!/usr/bin/env node
// LinguaVerse 启动器：在本地启动静态服务器，并打印电脑/手机访问地址。
import { networkInterfaces } from 'node:os';
import { spawn } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');

// 收集本机局域网 IPv4 地址
const nets = networkInterfaces();
const lanIPs = [];
for (const name of Object.keys(nets)) {
  for (const net of nets[name] ?? []) {
    if (net.family === 'IPv4' && !net.internal) lanIPs.push(net.address);
  }
}

const PORT = process.env.PORT || '3000';

console.log('\n  🌐 LinguaVerse 多语种学习平台');
console.log('  ─────────────────────────────────────────');
console.log('  📁 目录:', distDir);
console.log('  💻 电脑访问:');
console.log(`     http://localhost:${PORT}`);
if (lanIPs.length > 0) {
  console.log('  📱 手机访问（手机与电脑连同一 WiFi，用浏览器打开）:');
  for (const ip of lanIPs) console.log(`     http://${ip}:${PORT}`);
  console.log('  💡 在手机浏览器打开后，可"添加到主屏幕"作为 App 使用。');
} else {
  console.log('  ⚠️ 未检测到局域网 IP，仅本机可访问。');
}
console.log('  ⏹ 按 Ctrl + C 停止服务\n');

// 启动 serve（跨平台：Windows 用 npx.cmd，其他用 npx）
const npxBin = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const args = ['serve', distDir, '-s', '-L', '-l', `tcp://0.0.0.0:${PORT}`];
const child = spawn(npxBin, args, { stdio: 'inherit', shell: false });
child.on('error', (err) => {
  console.error('\n  [错误] 无法启动 serve，请确认已执行 npm install:', err.message);
  process.exit(1);
});
child.on('close', (code) => process.exit(code ?? 0));
