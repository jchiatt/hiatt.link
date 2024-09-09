/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

const links: Record<string, string> = {
  blog: "https://jchiatt.com/articles/",
  bjj: "https://grapplebjj.com",
  "living-on-the-edge":
    "https://docs.google.com/presentation/d/1qEr2vs_tTX_jv5Xmh-2xSk7iUBwdYVB2uceNOIl5CIo/",
  coaching: "https://www.skool.com/dev-career-coaching/about",
  dailywebchallenge: "https://quiz.typeform.com/to/GLTv7dGl",
  "daily-web-challenge": "https://quiz.typeform.com/to/GLTv7dGl",
  github: "https://github.com/jchiatt",
  instagram: "https://www.instagram.com/jchiatt/",
  ig: "https://www.instagram.com/jchiatt/",
  learnarena: "https://learnarena.com",
  linkedin: "https://www.linkedin.com/in/jchiatt/",
  me: "https://jchiatt.com",
  twitter: "https://twitter.com/jchiatt",
  x: "https://twitter.com/jchiatt",
};

const statusCode = 302;

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const { url } = request;

    const { pathname } = new URL(url);

    const route = pathname.split("/")[1];

    const redirectTo = links[route] || null;

    if (!redirectTo) {
      return new Response("Not Found.", { status: 404 });
    }

    return Response.redirect(redirectTo, statusCode);
  },
};
