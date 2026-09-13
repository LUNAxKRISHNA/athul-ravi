const SITE_URL = 'https://athul-ravi.vercel.app'
const SITE_NAME = 'Athul Ravi — Chemistry Researcher'

// React 19 hoists <title>/<meta>/<link> rendered anywhere in the tree into
// <head> automatically, so a page can just render this instead of needing a
// head-management library.
export function Seo({
  title,
  description,
  path = '',
  noindex = false,
}: {
  title: string
  description: string
  path?: string
  noindex?: boolean
}) {
  const url = `${SITE_URL}${path}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  )
}
