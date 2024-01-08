import Document, { Html, Head, Main, NextScript } from 'next/document'

//export default function Document
class MyDocument extends Document {
  render() {
    return (
      <Html className="scroll-smooth" lang="es">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,900;1,100;1,400;1,900&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body className="bg-gray-100 text-black antialiased dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
