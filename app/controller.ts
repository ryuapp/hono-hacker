import { Hono } from "hono";
import { cache } from "hono/cache";
import Home from "./page.tsx";
import { getItems } from "../features/hackerNews.ts";

const app = new Hono();

app.get(
  "/",
  cache({
    cacheName: "home",
    cacheControl: "max-age=60",
    wait: true,
  }),
  async (c) => {
    const items = await getItems();
    return c.render(Home(items));
  },
);

export default app;
