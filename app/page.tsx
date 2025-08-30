import { type Item } from "../features/hackerNews.ts";
import { PageHead } from "../components/PageHead.tsx";
import { ItemSummary } from "../components/ItemSummary.tsx";

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
