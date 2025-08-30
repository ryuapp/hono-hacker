import { GitHubIcon } from "./github-icon.tsx";

export function Footer() {
  return (
    <footer class="border-t-2 border-orange-200 bg-stone-100">
      <div class="flex justify-center gap-4 py-4">
        <a
          class="flex items-center"
          href="https://github.com/ryuapp/hono-hacker"
          aria-label="Repository"
        >
          <GitHubIcon />
        </a>
      </div>
    </footer>
  );
}
