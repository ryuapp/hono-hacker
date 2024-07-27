import { walk } from "@std/fs/walk";
import { type Hono } from "hono";

type FsRoutesOptions = {
  dir: string;
  prefix: string;
};

export async function fsRoutes(
  app: Hono,
  { dir, prefix }: FsRoutesOptions,
): Promise<void> {
  const entries = [];
  for await (const entry of walk(dir)) {
    if (entry.isFile && entry.name === prefix) entries.push(entry);
  }

  for (const entry of entries) {
    const entryPath = new URL(await Deno.realPath(entry.path)).pathname.replace(
      /\\/g,
      "/",
    );
    const dirName = dir.replace(/\.\/|\/$/, "");
    const routePath = entry.path.replace(dirName, "").replace(prefix, "")
      .replace(
        /\\/g,
        "/",
      ).replace(/\/$/, "");

    const subapp = await import(entryPath).then((mod) => mod.default);
    app.route(routePath, subapp);
  }
}
