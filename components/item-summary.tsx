import { getUrl, host, type Item, timeAgo } from "../features/hacker-news.ts";

type ItemSummaryProps = {
  item: Item;
  rank?: number;
};

export function ItemSummary({ item, rank }: ItemSummaryProps) {
  return (
    <div class="flex my-1">
      <div class="flex mt-1">
        {rank
          ? (
            <span class="text-sm text-gray-500 mr-1">
              {rank < 10 ? <>&nbsp;&nbsp;</> : ""}
              {rank}.
            </span>
          )
          : null}
        <span class="cursor-pointer text-sm text-gray-400 mr-1">▲</span>
      </div>
      <div>
        <div>
          <span class="mr-1 text-sm">
            <a href={getUrl(item)}>{item.title}</a>
          </span>
          <span class="text-xs text-gray-500">
            {item.url ? `(${host(item.url)})` : ""}
          </span>
        </div>
        <div class="text-xs text-gray-500 flex gap-1">
          <span>{item.points} point{item.points > 1 ? "s" : ""} by</span>
          <a class="hover:underline" href={`/user?id=${item.user}`}>
            {item.user}
          </a>
          <span>{timeAgo(item.time)} ago |</span>
          <a class="hover:underline" href={`/item?id=${item.id}`}>
            {`${item.comments_count} comment` +
              (item.comments_count && item.comments_count > 1 ? "s" : "")}
          </a>
        </div>
      </div>
    </div>
  );
}
