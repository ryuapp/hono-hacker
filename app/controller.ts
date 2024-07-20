import { Hono } from "hono";
import Home from "./page.tsx";
import { getItems } from "../features/hackerNews.ts";

const app = new Hono();

app.get(
  "/",
  async (c) => {
    const items = await getItems();
    return c.render(Home(items));
  },
);

export default app;
