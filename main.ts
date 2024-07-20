import { Hono } from "hono";
import { showRoutes } from 'hono/dev'
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

const app = new Hono();
app.use(logger(), cors(), secureHeaders());
app.use(
  jsxRenderer(({ children }) => {
    return BaseLayout(children);
  }),
);
app.use("/static/*", serveStatic({ root: "./", onNotFound: () => {} }));

app.route("/", home);
app.route("/item", item);
app.route("/user", user);

app.notFound((c) => c.render(NotFoundLayout()));
app.onError((err, c) => {
  console.error(err);
  return c.render(ErrorLayout());
});

showRoutes(app)

Deno.serve(app.fetch);
