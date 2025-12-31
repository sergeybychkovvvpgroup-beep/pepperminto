import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { Metadata } from 'next'
import 'nextra-theme-docs/style.css'
 
const DOCS_URL = process.env.DOCS_URL ?? "https://docs.pepperminto.dev";

export const metadata: Metadata = {
  metadataBase: new URL(DOCS_URL),
  title: {
    template: "Pepperminto",
    default: "Pepperminto - Revolutionizing Customer Support for Rapid Resolutions. Your Premier Zendesk Alternative.",
  },
  description: "Pepperminto is an open-source helpdesk focused on fast workflows, clear ownership, and reliable customer support.",
  openGraph: {
    images: "/og-image.png",
    url: DOCS_URL,
  },
  manifest: "/site.webmanifest",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "mask-icon", url: "/favicon.ico" },
    { rel: "image/x-icon", url: "/favicon.ico" },
  ],
  twitter: {
    site: "@potts_dev",
    creator: "@potts_dev",
  },
};

const banner = (<Banner storageKey="some-key">
    <a
      href="https://github.com/nulldoubt/Pepperminto/releases"
      target="_blank"
      rel="noreferrer"
    >
      🎉 Pepperminto updates are rolling out! Check the latest release notes. 🚀
    </a>
</Banner>)

const navbar = (
  <Navbar
    logo={<b>Pepperminto</b>}
  />
)

const sidebar = {
    defaultMenuCollapseLevel: 2,
    toggleButton: false,
}

export default async function RootLayout({ children }) {
  const title =
    metadata.title && typeof metadata.title === "object" && "template" in metadata.title
      ? metadata.title.template
      : undefined;
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/favicon.ico" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={metadata.description ?? "Pepperminto documentation"}
        />
        <meta
          name="og:title"
          content={title ? `${title} - Pepperminto` : "Pepperminto"}
        />
        <meta
          name="og:description"
          content={metadata.description ?? "Pepperminto documentation"}
        />
        <meta name="og:image" content="/og-image.png" />
        <meta
          name="og:url"
          content={
            typeof metadata.openGraph?.url === "string"
              ? metadata.openGraph.url
              : metadata.openGraph?.url?.toString() ?? DOCS_URL
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:site"
          content={metadata.twitter?.site ?? "@pepperminto"}
        />
        <meta
          name="twitter:creator"
          content={metadata.twitter?.creator ?? "@pepperminto"}
        />
        <meta name="apple-mobile-web-app-title" content="Pepperminto" />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/nulldoubt/Pepperminto"
          sidebar={sidebar}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
