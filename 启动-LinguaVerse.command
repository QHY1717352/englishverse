#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
echo
echo "  正在启动 LinguaVerse 多语种学习平台..."
echo
if ! command -v node >/dev/null 2>&1; then
  echo "  [错误] 未检测到 Node.js，请先安装 Node.js 16 以上版本：https://nodejs.org"
  exit 1
fi
if [ ! -d node_modules ]; then
  echo "  首次运行，正在安装依赖..."
  npm install
fi
if [ ! -d dist ]; then
  echo "  首次运行，正在打包应用..."
  npm run build
fi
node start.mjs
