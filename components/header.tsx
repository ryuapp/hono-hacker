export function Header() {
  return (
    <header class="bg-orange-400">
      <nav class="flex items-center gap-1 px-1">
        <a href="/">
          <img src="/static/logo.svg" alt="Hono Logo" class="h-5 w-5" />
        </a>
        <a style="color: black;" href="/">
          <span class="font-bold">Hono Hacker News</span>
        </a>
      </nav>
    </header>
  );
}
