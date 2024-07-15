import { User } from "../../utils/types.ts";

export default function UserPage(user: User) {
  return (
    <div class="bg-white pt-1 pb-3 px-3">
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
