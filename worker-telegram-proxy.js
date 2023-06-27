/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

//import handleProxy from './proxy.js';
//import handleRedirect from './redirect.js';
//import apiRouter from './router.js';

class WorkerError extends Error {
  constructor(statusCode, ...params) {
    super(...params)
    this.statusCode = statusCode
  }
}

// Export a default object containing event handlers
export default {

  // The fetch handler is invoked when this worker receives a HTTP(S) request
  // and should return a Response (optionally wrapped in a Promise)
  async fetch(request, env, ctx) {
    const resp_init = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST",
        "Report-To": "IKS",
      }
    };
    
    if (request.method !== "GET" && request.method !== "POST") {
      return new Response(`${JSON.stringify({ "ok": false,"error_code":500, "description":"Bad Request Method" })}\n`, resp_init);
    }
    // You'll find it helpful to parse the request.url string into a URL object. Learn more at https://developer.mozilla.org/en-US/docs/Web/API/URL
    const url = new URL(request.url);
    let url_api = 'https://api.telegram.org/bot' + env.TELEGRAM_BOTAPI_TOKEN + url.pathname;
    try {

      //console.log(request.method, "<--->", url.pathname, "<==>", url.search);
      if (request.method === "GET") {
        url_api += url.search;
        let resp = await fetch(url_api, {
          method: 'GET',
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });

        resp = new Response(resp.body, resp);
        resp.headers.set("Access-Control-Allow-Origin", "*");
        resp.headers.set("Content-Type", "application/json;charset=UTF-8");
        resp.headers.set("Report-To", "IKS");
        return resp;
      } else if (request.method === "POST") {
        let resp = await fetch(url_api, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(await request.json()),
        });
        resp = new Response(resp.body, resp);
        resp.headers.set("Access-Control-Allow-Origin", "*");
        resp.headers.set("Content-Type", "application/json;charset=UTF-8");
        resp.headers.set("Report-To", "IKS");
        return resp;
        //END POST
      }
    }
    catch (e) {
      console.log(e.stack);
      //throw new WorkerError(405, "method not allowed");
      return new Response(
        `${JSON.stringify({ "ok": false,"error_code":500, "description": "Json Format Error" })}\n`, resp_init);
    }
    /*
    // You can get pretty far with simple logic like if/switch-statements
    switch (url.pathname) {
      case '/redirect':
        return handleRedirect.fetch(request, env, ctx);

      case '/proxy':
        return handleProxy.fetch(request, env, ctx);
    }

    if (url.pathname.startsWith('/api/')) {
      // You can also use more robust routing
      return apiRouter.handle(request);
    }
    */
  },
};

