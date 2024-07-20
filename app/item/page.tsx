import { PageHead } from "../../components/PageHead.tsx";
import { Comments } from "./Comments.tsx";
import { ItemSummary } from "../../components/ItemSummary.tsx";
import { Item } from "../../features/hackerNews.ts";
import { SITE_TITLE } from "../../config/site.ts";

type ItemProps = {
  item: Item;
  url: string;
};

export default function ItemPage(props: ItemProps) {
  const { item, url } = props;
  return (
    <>
      <PageHead title={item.title + " | " + SITE_TITLE} url={url} />
      <div class="bg-white pt-1 pb-3 px-3">
        <div class="divide-y space-y-3">
          <ItemSummary item={item} />
          {item.comments ? <Comments comments={item.comments} /> : null}
        </div>
      </div>
    </>
  );
}
