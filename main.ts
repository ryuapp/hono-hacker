import { Hono } from "hono";
import { cache } from "./middleware/cache.ts";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { serveStatic } from "hono/deno";
import { BaseLayout } from "./layouts/base-layout.tsx";
import { NotFoundLayout } from "./layouts/not-found-layout.tsx";
import { ErrorLayout } from "./layouts/error-layout.tsx";

import homeController from "./app/controller.tsx";
import itemController from "./app/item/controller.tsx";
import userController from "./app/user/controller.tsx";
import { CACHE_NAME } from "./config/site.ts";

const app = new Hono();
app.use(
  logger(),
  cors(),
  secureHeaders(),
);

app.use(async (c, next) => {
  c.setRenderer((content, props) => {
    return BaseLayout({
      children: content,
      title: props?.title,
      description: props?.description,
      url: props?.url,
    });
  });
  await next();
});

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

app.route("/", homeController);
app.route("/item", itemController);
app.route("/user", userController);

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
