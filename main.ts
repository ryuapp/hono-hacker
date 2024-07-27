import { Hono } from "hono";
import { cache } from "hono/cache";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { jsxRenderer } from "hono/jsx-renderer";
import { serveStatic } from "hono/deno";
import { BaseLayout } from "./layouts/BaseLayout.tsx";
import { NotFoundLayout } from "./layouts/NotFoundLayout.tsx";
import { ErrorLayout } from "./layouts/ErrorLayout.tsx";

import { fsRoutes } from "./lib/fsRoutes.ts";

const app = new Hono();
app.use(
  logger(),
  cors(),
  secureHeaders(),
  jsxRenderer(({ children }) => {
    return BaseLayout(children);
  }),
);
app.use("/static/*", serveStatic({ root: "./", onNotFound: () => { } }));

if (Deno.env.get("IS_DEVELOPMENT")) {
  app.get(
    "*",
    cache({
      cacheName: "hono-hacker-news",
      cacheControl: "max-age=60",
      wait: true,
    }),
  );
}

await fsRoutes(app, { dir: "./app", prefix: "controller.ts" });

app.notFound((c) => c.render(NotFoundLayout()));
app.onError((err, c) => {
  console.error(err);
  return c.render(ErrorLayout());
});

showRoutes(app);

Deno.serve(app.fetch);
