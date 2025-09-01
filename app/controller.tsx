import { Hono } from "hono";
import { getItems, type Item } from "../features/hacker-news.ts";
import { ItemSummary } from "../components/item-summary.tsx";

const app = new Hono();

app.get(
  "/",
  async (c) => {
    const items = await getItems();
    return c.render(<Home items={items} />);
  },
);

function Home({ items }: {
  items: Array<Item>;
}) {
  return (
    <div class="bg-stone-100 pt-1 pb-3">
      {items.map((item, i) => (
        <ItemSummary
          item={item}
          rank={i + 1}
        />
      ))}
    </div>
  );
}

export default app;
