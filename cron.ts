import { CACHE_NAME } from "./config/site.ts";

const URL = Deno.env.get("IS_DEVELOPMENT")
  ? "http://localhost:8000"
  : "https://127.0.0.1:80";

Deno.cron("Remove cache every 2 minutes", "*/2 * * * *", async () => {
  console.log("Removing cache");
  const cache = await caches.open(CACHE_NAME);
  await cache.delete(URL + "/");
  await cache.delete(URL + "/item", { ignoreSearch: true });
  await cache.delete(URL + "/user", { ignoreSearch: true });
  console.log("Cache removed");
});
