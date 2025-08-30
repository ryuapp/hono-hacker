import { Header } from "../components/header.tsx";
import { Footer } from "../components/footer.tsx";

export function BaseLayout(children: JSX.Element) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link rel="icon" href="/static/logo.svg" />
        <link rel="stylesheet" type="text/css" href="/static/main.gen.css" />
      </head>
      <body class="mx-auto md:p-2 md:w-[85%] bg-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
