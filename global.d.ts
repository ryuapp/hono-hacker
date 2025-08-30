import "hono";

declare module "hono" {
  interface ContextRenderer {
    (
      content: JSX.Element,
      props?: {
        title?: string;
        description?: string;
        url?: string;
      },
    ): Response | Promise<Response>;
  }
}
