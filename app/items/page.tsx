import { BaseHead } from "../../components/BaseHead.tsx";
import { Comments } from "./Comments.tsx";
import { ItemSummary } from "../../components/ItemSummary.tsx";
import { Item } from "../../utils/types.ts";

export default function ItemPage(item: Item) {
  return (
    <>
      <BaseHead />
      <div class="bg-white pt-1 pb-3 px-3">
        <div class="divide-y space-y-3">
          <ItemSummary item={item} />
          <Comments comments={item.comments} />
        </div>
      </div>
    </>
  );
}
