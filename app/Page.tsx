import { type Item } from "../utils/types.ts";
import { BaseHead } from "../components/BaseHead.tsx";
import { ItemSummary } from "../components/ItemSummary.tsx";

export default function Home(items: Array<Item>) {
  return (
    <>
      <BaseHead />
      <div class="bg-white pt-1 pb-3 px-3">
        {items.map((item) => <ItemSummary item={item} />)}
      </div>
    </>
  );
}
