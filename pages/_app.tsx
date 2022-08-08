import 'antd/dist/antd.css'
import '../styles/reset.css'
import '../styles/globals.css'

import { type NextPage } from 'next'
import { type AppProps } from 'next/app'
import Script from 'next/script'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      {getLayout(<Component {...pageProps} />)}

      <Script>
        {`if('paintWorklet' in CSS)CSS.paintWorklet.addModule('https://www.unpkg.com/css-houdini-squircle@0.2.0/squircle.min.js')`}
      </Script>
    </>
  )
}
