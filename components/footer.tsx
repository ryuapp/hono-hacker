import { GitHubIcon } from "./github-icon.tsx";

export function Footer() {
  return (
    <footer class="border-orange-200 border-t-2 bg-stone-100 flex flex-col items-center gap-2">
      <div class="flex gap-4 pt-4">
        <a
          class="flex items-center"
          href="https://github.com/ryuapp/hono-hacker"
          aria-label="Repository"
        >
          <GitHubIcon />
        </a>
      </div>
      <div class="pb-4 text-center text-sm text-stone-600">
        © 2026{" "}
        <a class="underline hover:no-underline" href="https://ryu.app">
          Ryu
        </a>
      </div>
    </footer>
  );
}
