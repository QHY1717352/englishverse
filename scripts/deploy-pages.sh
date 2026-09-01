#!/usr/bin/env bash
# 一键部署 EnglishVerse 到 GitHub Pages（https://qhy1717352.github.io/）
# 用法：在项目根目录运行 bash scripts/deploy-pages.sh
# 前提：本机已通过 `gh auth login` 登录 GitHub
set -e

cd "$(dirname "$0")/.."

echo "==> 1/3 构建生产版本"
npm run build

echo "==> 2/3 准备部署文件"
DEPLOY_DIR=/tmp/ghpages-deploy
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"
cp -r dist/. "$DEPLOY_DIR/"
# SPA 路由兜底：未知路径渲染 404.html（内容同 index.html）
cp "$DEPLOY_DIR/index.html" "$DEPLOY_DIR/404.html"

echo "==> 3/3 推送至 Pages 仓库"
TOKEN=$(gh auth token)
cd "$DEPLOY_DIR"
git init -q -b main
git add -A
git -c user.name="QHY1717352" -c user.email="qhy1717352@users.noreply.github.com" \
  commit -q -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')"
git push --force "https://x-access-token:${TOKEN}@github.com/QHY1717352/QHY1717352.github.io.git" main

echo ""
echo "✅ 部署完成：https://qhy1717352.github.io/ （约 1 分钟后生效）"