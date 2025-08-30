import { Header } from "../components/header.tsx";
import { Footer } from "../components/footer.tsx";
import { PageHead } from "../components/page-head.tsx";

type BaseLayoutProps = {
  children: JSX.Element;
  title?: string;
  description?: string;
  url?: string;
};

export function BaseLayout({
  children,
  title,
  description,
  url,
}: BaseLayoutProps) {
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
        <PageHead title={title} description={description} url={url} />
      </head>
      <body class="mx-auto bg-white md:w-[85%] md:p-2">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
