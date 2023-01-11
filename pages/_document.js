import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="sk">
      <Head >
        <Script
          src="https://kit.fontawesome.com/44b7bdd977.js" strategy='lazyOnload'/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
