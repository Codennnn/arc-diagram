import { type NodeProps } from 'react-flow-renderer'

import type { NodeDataQueue } from '../../../diagram.type'
import NodeWrapper from '../kit/NodeWrapper'

export default function NodeQueue(node: NodeProps<NodeDataQueue>) {
  const { label } = node.data

  return (
    <NodeWrapper {...node}>
      <div className="py-2 px-6">{label}</div>
    </NodeWrapper>
  )
}
