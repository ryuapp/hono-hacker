import { type Item } from "../features/hackerNews.ts";
import { PageHead } from "../components/PageHead.tsx";
import { ItemSummary } from "../components/ItemSummary.tsx";

export default function Home(items: Array<Item>) {
  return (
    <>
      <PageHead />
      <div class="bg-white pt-1 pb-3 px-3">
        {items.map((item, i) => <ItemSummary item={item} rank={i + 1} />)}
      </div>
    </>
  );
}
