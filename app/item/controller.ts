import { Hono } from "hono";
import { getItem } from "../../features/hacker-news.ts";

import ItemPage from "./page.tsx";

const app = new Hono();

app.get(
  "/",
  async (c) => {
    const id = c.req.query("id");
    if (!id) return c.notFound();

    const item = await getItem(Number(id));
    const url = c.req.url;

    return c.render(ItemPage({ item, url }));
  },
);

export default app;
