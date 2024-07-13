import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { type Child } from "hono/jsx";

export function BaseLayout(children: Child) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
