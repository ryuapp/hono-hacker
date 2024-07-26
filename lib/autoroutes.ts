import { argv } from "node:process";
import { walk } from "@std/fs/walk";
import { Hono } from "hono";
import { relative } from "@std/path/relative";

type AutoroutesOptions = {
  routeDir: string;
  prefix: string;
};

export async function autoroutes(
  app: Hono,
  { routeDir, prefix }: AutoroutesOptions,
): Promise<void> {
  const execPath = argv[1];
  const entries = [];
  for await (const entry of walk(routeDir)) {
    if (entry.isFile && entry.name === prefix) entries.push(entry);
  }

  for (const entry of entries) {
    const entryPath = relative(execPath, entry.path).replace(/\.\.\\/g, "../");
    const dirName = routeDir.replace(/\.\/|\/$/, "");
    const routePath = entry.path.replace(dirName, "").replace(prefix, "")
      .replace(
        /\\/g,
        "/",
      ).replace(/\/$/, "");

    const subapp = await import(entryPath).then((mod) => mod.default);
    app.route(routePath, subapp);
  }
}
