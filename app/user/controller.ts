import { Hono } from "hono";
import { cache } from "hono/cache";
import { getUser } from "../../features/hackerNews.ts";

import UserPage from "./page.tsx";

const app = new Hono();

app.get(
  "/",
  cache({
    cacheName: (c) => {
      const id = c.req.query("id") ?? "none";
      return `user-${id}`;
    },
    cacheControl: "max-age=60",
    wait: true,
  }),
  async (c) => {
    const id = c.req.query("id");
    if (!id) return c.notFound();

    const user = await getUser(id);
    const url = c.req.url;

    return c.render(UserPage({ user, url }));
  },
);

export default app;
