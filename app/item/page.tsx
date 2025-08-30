import { CommentSection } from "./comment-section.tsx";
import { ItemSummary } from "../../components/item-summary.tsx";
import { Item } from "../../features/hacker-news.ts";

type ItemProps = {
  item: Item;
};

export default function ItemPage({ item }: ItemProps) {
  return (
    <div class="bg-stone-100 pt-1 pb-3 px-3">
      <div class="divide-y space-y-3">
        <ItemSummary item={item} />
        {item.comments ? <CommentSection comments={item.comments} /> : null}
      </div>
    </div>
  );
}
