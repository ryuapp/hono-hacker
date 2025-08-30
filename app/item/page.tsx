import { PageHead } from "../../components/page-head.tsx";
import { CommentSection } from "./comment-section.tsx";
import { ItemSummary } from "../../components/item-summary.tsx";
import { Item } from "../../features/hacker-news.ts";
import { SITE_TITLE } from "../../config/site.ts";

type ItemProps = {
  item: Item;
  url: string;
};

export default function ItemPage({ item, url }: ItemProps) {
  return (
    <>
      <PageHead title={item.title + " | " + SITE_TITLE} url={url} />
      <div class="bg-stone-100 pt-1 pb-3 px-3">
        <div class="divide-y space-y-3">
          <ItemSummary item={item} />
          {item.comments ? <CommentSection comments={item.comments} /> : null}
        </div>
      </div>
    </>
  );
}
