import './globals.css';
import { Nunito } from 'next/font/google';
import { config, gtm } from '@/config';
import { headers } from 'next/headers';
import { Metadata, Viewport } from 'next';

const inter = Nunito({ subsets: ['latin'] });

export const generateMetadata = (): Metadata => {
  const headerList = headers();
  const host = headerList.get('host') || '';

  const appConfig = config[host];
  const title = appConfig.appTitle;
  const description = appConfig.appDescription;
  const publicPath = appConfig.publicPath;

  return {
    metadataBase: new URL(appConfig.url),
    title,
    description,
    keywords: appConfig.metaKeywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      url: appConfig.url,
      siteName: title,
      images: [
        {
          url: `${publicPath}/og-image-192x192.png`,
          width: 192,
          height: 192,
          alt: title,
        },
      ],
    },
    robots: 'index, follow',
    icons: {
      icon: [
        {url: `${publicPath}/favicon-32x32.png`},
        {url: `${publicPath}/favicon-16x16.png`},
        {url: `${publicPath}/favicon.ico`},
        {rel: 'mask-icon', url: `${publicPath}/safari-pinned-tab.svg`, color: '#0f172a'},
      ],
      apple: `${publicPath}/apple-touch-icon.png`,
    },
    manifest: `${publicPath}/manifest.json`,
    category: 'Games',
  };
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerList = headers();
  const host = headerList.get('host') || '';
  const gtmId = gtm[host];

  return (
    <html lang="en">
      <head>
        <script src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`} />
        <script dangerouslySetInnerHTML={
          {
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtmId}');
            `
          }
        } />
      </head>
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
