import { Hono } from "hono";
import { getUser } from "../../utils/api.ts";

import UserPage from "./page.tsx";

const app = new Hono();

app.get("/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) return c.notFound();

  const user = await getUser(id);
  return c.render(UserPage(user));
});

export default app;
