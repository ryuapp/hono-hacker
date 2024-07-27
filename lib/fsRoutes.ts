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
    const entryPath = await Deno.realPath(entry.path);
    const importPath = new URL(entryPath).pathname
      .replace(
        /\\/g,
        "/",
      );
    const dirPath = await Deno.realPath(dir);
    const routePath = entryPath.replace(dirPath, "").replace(prefix, "")
      .replace(
        /\\/g,
        "/",
      ).replace(/\/$/, "");

    const subapp = await import(importPath).then((mod) => mod.default);
    app.route(routePath, subapp);
  }
}
