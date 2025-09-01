import { Hono } from "hono";
import { getItem, type Item } from "../../features/hacker-news.ts";
import { SITE_TITLE } from "../../config/site.ts";
import { CommentSection } from "./comment-section.tsx";
import { ItemSummary } from "../../components/item-summary.tsx";

const app = new Hono();

app.get(
  "/",
  async (c) => {
    const id = c.req.query("id");
    if (!id) return c.notFound();

    const item = await getItem(Number(id));
    const url = c.req.url;

    return c.render(<ItemPage item={item} />, {
      title: item.title + " | " + SITE_TITLE,
      url: url,
    });
  },
);

function ItemPage({ item }: {
  item: Item;
}) {
  return (
    <div class="bg-stone-100 px-3 pt-1 pb-3">
      <div class="space-y-3 divide-y">
        <ItemSummary item={item} />
        {item.comments ? <CommentSection comments={item.comments} /> : null}
      </div>
    </div>
  );
}

export default app;
