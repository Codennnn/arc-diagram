import Head from 'next/head'
import { ReactFlowProvider } from 'react-flow-renderer'

import Flow from '../components/Flow'
import FlowContextProvider from '../diagram.context'
import { getPageTitle } from '../util'
export default function HomePage() {
  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
      </Head>

      <div className="h-full">
        <ReactFlowProvider>
          <FlowContextProvider>
            <Flow />
          </FlowContextProvider>
        </ReactFlowProvider>
      </div>
    </>
  )
}
