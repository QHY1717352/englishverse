@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo   正在启动 LinguaVerse 多语种学习平台...
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo   [错误] 未检测到 Node.js，请先安装 Node.js 16 以上版本：https://nodejs.org
  pause
  exit /b 1
)
if not exist node_modules (
  echo   首次运行，正在安装依赖...
  call npm install
)
if not exist dist (
  echo   首次运行，正在打包应用...
  call npm run build
)
node start.mjs
pause
