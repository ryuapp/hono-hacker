export type ItemRaw = {
  id: number;
  url?: string;
  title?: string;
  type: "job" | "story" | "comment" | "poll";
  score: number;
  by: string;
  text?: string;
  time: number;
  kids?: number[];
};

export type Item = {
  id: number;
  url?: string;
  title?: string;
  type: "job" | "story" | "comment" | "poll";
  points: number;
  user: string;
  content?: string;
  time: number;
  comments_count?: number;
  comments?: Item[];
};

export type UserRaw = {
  id: string;
  created: string;
  karma: number;
};

export type User = {
  id: string;
  created_at: string;
  karma: number;
};

const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export async function getItems(): Promise<Item[]> {
  const resp = await fetch(`${BASE_URL}/topstories.json`);
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`${resp.status} ${body}`);
  }
  const itemIds = Object.values(await resp.json()).slice(0, 30) as number[];
  return await Promise.allSettled(itemIds.map((id) => fetchItem(id))).then((
    results,
  ) =>
    results.filter((result) => result.status === "fulfilled")
      .map((result) => result.value)
  );
}

// Filter out comments that are dead or flagged
function filterComments(item: Item) {
  if (item.comments) {
    item.comments = item.comments.filter((comment) => {
      if (
        !comment.user ||
        (comment.content?.startsWith("[") && comment.content?.endsWith("]"))
      ) {
        return false;
      }
      filterComments(comment);
      return true;
    });
  }
}

export async function getItem(id: number): Promise<Item> {
  const item = await fetchItem(id, true);
  filterComments(item);

  return item;
}

export async function getUser(id: string): Promise<User> {
  const user = await fetchUser(id);
  return user;
}

async function fetchItem(id: number, withComments = false): Promise<Item> {
  const resp = await fetch(`${BASE_URL}/item/${id}.json`);
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`${resp.status} ${body}`);
  }

  const item = (await resp.json()) as ItemRaw;
  const kids = item.kids || [];
  return {
    id: item.id,
    user: item.by,
    points: item.score,
    time: item.time,
    content: item.text,
    url: item.url,
    type: item.type,
    title: item.title,
    comments_count: Object.values(kids).length,
    comments: withComments
      ? await Promise.all(
        Object.values(kids).map((id) => fetchItem(id, withComments)),
      )
      : [],
  };
}

async function fetchUser(id: string): Promise<User> {
  const resp = await fetch(`${BASE_URL}/user/${id}.json`);
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`${resp.status} ${body}`);
  }

  const user = (await resp.json()) as UserRaw;
  return {
    id: user.id,
    created_at: user.created,
    karma: user.karma,
  };
}

export function getUrl(item: Item) {
  return item.url && isAbsolute(item.url) ? item.url : `/item?id=${item.id}`;
}

export function isAbsolute(url: string) {
  return /^https?:\/\//.test(url);
}

export function host(url: string) {
  const host = url
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace("?id=", "/");
  const parts = host.split(".").slice(-3);
  if (parts[0] === "www") parts.shift();
  return parts.join(".");
}

export function timeAgo(time: number | Date) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) return pluralize(~~(between / 60), " minute");
  else if (between < 86400) return pluralize(~~(between / 3600), " hour");
  else return pluralize(~~(between / 86400), " day");
}

export function pluralize(time: number, label: string) {
  if (time === 1) return time + label;
  return `${time + label}s`;
}
