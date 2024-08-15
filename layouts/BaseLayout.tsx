import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { type Child } from "hono/jsx";

export function BaseLayout(children: Child) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/static/logo.svg" />
        <link rel="stylesheet" type="text/css" href="/static/main.gen.css" />
      </head>
      <body class="mx-auto md:p-2 md:w-[85%] bg-[#f9f9f9]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
