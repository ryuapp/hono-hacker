import { DESCRIPTION, SITE_TITLE, SITE_URL } from "../config/site.ts";

type HeadProps = {
  title?: string;
  description?: string;
  url?: string;
};

export function PageHead({
  title = SITE_TITLE,
  description = DESCRIPTION,
  url = SITE_URL,
}: HeadProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* @ts-ignore */}
      <meta property="og:title" content={title} />
      {/* @ts-ignore */}
      <meta property="og:description" content={description} />
      {/* @ts-ignore */}
      <meta property="og:type" content="website" />
      {/* @ts-ignore */}
      <meta property="og:url" content={url} />
      {/* @ts-ignore */}
      <meta property="og:image" content={SITE_URL + "/static/og.png"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SITE_URL + "/static/og.png"} />
    </>
  );
}
