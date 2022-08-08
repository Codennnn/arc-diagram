import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link href="/favicon.png" rel="icon" sizes="32x32" />
          <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
          <meta content="light" name="color-scheme" />

          <meta content="diagram,flow-chart,Architecture Diagram,架构图设计" name="keywords" />
          <meta content="简易的架构图在线设计网站。" name="description" />
          <meta content="陈梓聪 LeoKu" name="author" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
