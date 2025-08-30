import "hono";
declare module "hono" {
  interface ContextRenderer {
    (content: JSX.Element): Response | Promise<Response>;
  }
}
