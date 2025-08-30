import { User } from "../../features/hacker-news.ts";
import { PageHead } from "../../components/page-head.tsx";
import { SITE_TITLE } from "../../config/site.ts";

type UserProps = {
  user: User;
  url: string;
};

export default function UserPage({ user, url }: UserProps) {
  return (
    <div class="bg-stone-100 pt-1 pb-3 px-3">
      <PageHead title={user.id + " | " + SITE_TITLE} url={url} />
      <ul class="my-1 text-sm">
        <li>
          <span class="inline-block min-w-3.5">User:</span> {user.id}
        </li>
        <li>
          <span class="inline-block min-w-3.5">Created:</span> {user.created_at}
        </li>
        <li>
          <span class="inline-block min-w-3.5">Karma:</span> {user.karma}
        </li>
      </ul>
      <p class="pt-2 text-sm">
        <a
          class="underline"
          href={`https://news.ycombinator.com/submitted?id=${user.id}`}
        >
          submissions
        </a>{" "}
        |{" "}
        <a
          class="underline"
          href={`https://news.ycombinator.com/threads?id=${user.id}`}
        >
          comments
        </a>{" "}
        |{" "}
        <a
          class="underline"
          href={`https://news.ycombinator.com/favorites?id=${user.id}`}
        >
          favorites
        </a>
      </p>
    </div>
  );
}
