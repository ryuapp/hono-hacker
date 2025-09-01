import { Hono } from "hono";
import { getUser, type User } from "../../features/hacker-news.ts";
import { SITE_TITLE } from "../../config/site.ts";

const app = new Hono();

app.get(
  "/",
  async (c) => {
    const id = c.req.query("id");
    if (!id) return c.notFound();

    const user = await getUser(id);
    const url = c.req.url;

    return c.render(<UserPage user={user} />, {
      title: user.id + " | " + SITE_TITLE,
      url: url,
    });
  },
);

function UserPage({ user }: {
  user: User;
}) {
  return (
    <div class="bg-stone-100 px-3 pt-1 pb-3">
      <ul class="my-1 text-sm">
        <li>
          <span class="inline-block min-w-3.5">User:</span> {user.id}
        </li>
        <li>
          <span class="inline-block min-w-3.5">Created:</span> {user.created_at}
        </li>
        <li>
          <span class="inline-block min-w-3.5">Karma:</span> {user.karma}
        </li>
      </ul>
      <p class="flex gap-1 pt-2 text-sm">
        <a
          class="underline"
          href={`https://news.ycombinator.com/submitted?id=${user.id}`}
        >
          submissions
        </a>
        |
        <a
          class="underline"
          href={`https://news.ycombinator.com/threads?id=${user.id}`}
        >
          comments
        </a>
        |
        <a
          class="underline"
          href={`https://news.ycombinator.com/favorites?id=${user.id}`}
        >
          favorites
        </a>
      </p>
    </div>
  );
}

export default app;
