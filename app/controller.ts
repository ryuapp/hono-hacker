import { Hono } from "hono";

import Home from "./Page.tsx";
import { getItems } from "../utils/api.ts";

const app = new Hono();

app.get("/", async (c) => {
  const items = await getItems();
  return c.render(Home(items));
});

export default app;
