import { Hono } from "hono";
import { cache } from "./middleware/cache.ts";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { jsxRenderer } from "hono/jsx-renderer";
import { serveStatic } from "hono/deno";
import { BaseLayout } from "./layouts/BaseLayout.tsx";
import { NotFoundLayout } from "./layouts/NotFoundLayout.tsx";
import { ErrorLayout } from "./layouts/ErrorLayout.tsx";

import home from "./app/controller.ts";
import item from "./app/item/controller.ts";
import user from "./app/user/controller.ts";
import { CACHE_NAME } from "./config/site.ts";

const app = new Hono();
app.use(
  logger(),
  cors(),
  secureHeaders(),
  jsxRenderer(({ children }) => {
    return BaseLayout({ children });
  }),
);
app.use("/static/*", serveStatic({ root: "./", onNotFound: () => {} }));

if (!Deno.env.get("IS_DEVELOPMENT")) {
  app.get(
    "*",
    cache({
      cacheName: CACHE_NAME,
      cacheControl: "max-age=60",
      wait: true,
      duration: 120,
    }),
  );
}

app.route("/", home);
app.route("/item", item);
app.route("/user", user);

app.notFound((c) => {
  c.status(404);
  return c.render(NotFoundLayout());
});
app.onError((err, c) => {
  console.error(err);
  c.status(500);
  return c.render(ErrorLayout());
});

showRoutes(app);

Deno.serve(app.fetch);
