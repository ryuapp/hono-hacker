import { PageHead } from "../../components/PageHead.tsx";
import { CommentSection } from "./CommentSection.tsx";
import { ItemSummary } from "../../components/ItemSummary.tsx";
import { Item } from "../../features/hackerNews.ts";
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
