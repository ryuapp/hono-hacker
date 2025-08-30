import { type Item } from "../features/hacker-news.ts";
import { PageHead } from "../components/page-head.tsx";
import { ItemSummary } from "../components/item-summary.tsx";

type HomeProps = {
  items: Array<Item>;
};

export default function Home({ items }: HomeProps) {
  return (
    <>
      <PageHead />
      <div class="bg-stone-100 pt-1 pb-3">
        {items.map((item, i) => (
          <ItemSummary
            item={item}
            rank={i + 1}
          />
        ))}
      </div>
    </>
  );
}
