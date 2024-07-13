export function Header() {
  return (
    <header class="bg:orange">
      <nav class="h:14 p:2px md:h:8 flex gap:1 items-center">
        <a href="/">
          <img
            src="/static/logo.svg"
            alt="Hono Logo"
            class="h:5 w:5"
          />
        </a>
        <a href="/">
          <span class="font:bold">Hono Hacker News</span>
        </a>
      </nav>
    </header>
  );
}
