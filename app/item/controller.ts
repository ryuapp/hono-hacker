import { Hono } from "hono";
import { cache } from "hono/cache";
import { getItem } from "../../features/hackerNews.ts";

import ItemPage from "./page.tsx";

const app = new Hono();

app.get(
  "/",
  cache({
    cacheName: (c) => {
      const id = c.req.query("id") ?? "none";
      return `item-${id}`;
    },
    cacheControl: "max-age=3600",
    wait: true,
  }),
  async (c) => {
    const id = c.req.query("id");
    if (!id) return c.notFound();

    const item = await getItem(Number(id));
    const url = c.req.url;

    return c.render(ItemPage({ item, url }));
  },
);

export default app;
