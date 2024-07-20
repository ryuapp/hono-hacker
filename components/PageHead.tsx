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
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SITE_URL + "/ogp.png"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SITE_URL + "/ogp.png"} />
    </>
  );
}
