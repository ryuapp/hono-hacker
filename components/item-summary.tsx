import { getUrl, host, type Item, timeAgo } from "../features/hacker-news.ts";

type ItemSummaryProps = {
  item: Item;
  rank?: number;
};

export function ItemSummary({ item, rank }: ItemSummaryProps) {
  return (
    <div class="my-1 flex">
      <div class="mt-1 flex">
        {rank
          ? (
            <span class="mr-1 text-gray-500 text-sm">
              {rank < 10 ? <>&nbsp;&nbsp;</> : ""}
              {rank}.
            </span>
          )
          : null}
        <span class="mr-1 cursor-pointer text-gray-400 text-sm">▲</span>
      </div>
      <div>
        <div>
          <span class="mr-1 text-sm">
            <a href={getUrl(item)}>{item.title}</a>
          </span>
          <span class="text-gray-500 text-xs">
            {item.url ? `(${host(item.url)})` : ""}
          </span>
        </div>
        <div class="flex gap-1 text-gray-500 text-xs">
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
