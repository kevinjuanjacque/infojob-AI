
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Vadodara&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-fondo max ">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
