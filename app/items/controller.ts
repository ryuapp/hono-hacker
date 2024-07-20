import { Hono } from "hono";
import { getItem } from "../../features/hackerNews.ts";

import ItemPage from "./page.tsx";

const app = new Hono();

app.get("/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) return c.notFound();

  const item = await getItem(Number(id));
  return c.render(ItemPage(item));
});

export default app;
