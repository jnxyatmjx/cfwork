# cfwork
A Cloudflare Worker for transparent proxies the Telegram(Github and so on) API.

## 1. 开发环境搭建
### 1.1 内网调试公网API开发环境搭建
1. WSL2内开启对应服务。如`python3 -m http.server --bind 0.0.0.0 8080`。注意根据[WSL2环境特性](https://learn.microsoft.com/en-us/windows/wsl/networking)要绑定0.0.0.0。
2. WSL2安装ngrok服务将内网服务暴露到公网。如`ngrok http http://0.0.0.0:8080`。
3. 后续公网API调用可以通过调用ngrok来实现了。如下
```
   ngrok
    🤯 Announcing ngrok's Kubernetes Ingress Controller: `https://ngrok.com/s/k8s-ingress`

Session Status                online
Account                       KDS (Plan: Free)
Version                       3.3.1
Region                        Japan (jp)
Latency                       1821ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://a468-1-1-1-1.ngrok-free.app -> http://0.0.0.0:8080
Connections                   ttl     opn     rt1     rt5     p50     p90
                               0       0       0.00    0.00    0.00    0.00
```

