import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { jsxRenderer } from "hono/jsx-renderer";
import { serveStatic } from "hono/deno";
import { masterCssMiddleware as masterCSS } from "@totto/hono-mastercss";

import { BaseLayout } from "./layouts/BaseLayout.tsx";
import { NotFoundLayout } from "./layouts/NotFoundLayout.tsx";
import { ErrorLayout } from "./layouts/ErrorLayout.tsx";

import home from "./app/controller.ts";
import items from "./app/items/controller.ts";
import users from "./app/users/controller.ts";

const app = new Hono();
app.use(logger());
app.use(cors());
app.use(secureHeaders());
app.use(masterCSS());

app.use(
  jsxRenderer(({ children }) => {
    return BaseLayout(children);
  }),
);
app.use("/static/*", serveStatic({ root: "./", onNotFound: () => {} }));

app.route("/", home);
app.route("/items", items);
app.route("/users", users);

app.notFound((c) => c.render(NotFoundLayout()));
app.onError((err, c) => {
  console.error(err);
  return c.render(ErrorLayout());
});

Deno.serve(app.fetch);
