import { Hono } from "hono";
import { getUser } from "../../features/hacker-news.ts";
import { SITE_TITLE } from "../../config/site.ts";

import UserPage from "./page.tsx";

const app = new Hono();

app.get(
  "/",
  async (c) => {
    const id = c.req.query("id");
    if (!id) return c.notFound();

    const user = await getUser(id);
    const url = c.req.url;

    return c.render(UserPage({ user }), {
      title: user.id + " | " + SITE_TITLE,
      url: url,
    });
  },
);

export default app;
