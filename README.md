# cfwork
A Cloudflare Worker for transparent proxies the Telegram(Github and so on) API.

# 内网开发环境搭建
1. WSL2内开启对应服务，如python3 -m http.server --bind 0.0.0.0 8080。注意根据WSL2环境特性要绑定0.0.0.0。
2. WSL2安装ngrok服务，如ngrok http http://0.0.0.0:8080 。方便将内网服务暴露到公网。
3. 
