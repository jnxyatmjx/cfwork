# cfwork
A Cloudflare Worker for transparent proxies the Telegram(Github and so on) API.

## 1. 开发环境搭建
### 1.1 内网调试公网API开发环境搭建
1. WSL2内开启对应服务。如python3 -m http.server --bind 0.0.0.0 8080。注意根据[WSL2环境特性](https://learn.microsoft.com/en-us/windows/wsl/networking)要绑定0.0.0.0。
2. WSL2安装ngrok服务将内网服务暴露到公网。如ngrok http http://0.0.0.0:8080。
3. 
