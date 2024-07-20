import { Hono } from "hono";
import { getUser } from "../../features/hackerNews.ts";

import UserPage from "./page.tsx";

const app = new Hono();

app.get("/", async (c) => {
  const id = c.req.query("id");
  if (!id) return c.notFound();

  const user = await getUser(id);
  return c.render(UserPage(user));
});

export default app;
