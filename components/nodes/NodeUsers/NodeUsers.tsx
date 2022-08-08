import { type NodeProps } from 'react-flow-renderer'

import type { NodeDataUsers } from '../../../diagram.type'
import IconUserDesktop from '../../icons/IconUserDesktop'
import IconUserLaptop from '../../icons/IconUserLaptop'
import IconUserMobile from '../../icons/IconUserMobile'
import NodeWrapper from '../kit/NodeWrapper'

const IconUser = (props: { type: string }) => {
  switch (props.type) {
    case 'desktop':
      return <IconUserDesktop />

    case 'laptop':
      return <IconUserLaptop />

    case 'mobile':
      return <IconUserMobile />

    default:
      return null
  }
}

export default function NodeUsers(node: NodeProps<NodeDataUsers>) {
  return (
    <NodeWrapper {...node}>
      <div className="flex flex-col items-center p-2">
        <div className="mb-1">
          <IconUser type={node.data.icon || 'desktop'} />
        </div>

        <span>{node.data.label}</span>
      </div>
    </NodeWrapper>
  )
}
