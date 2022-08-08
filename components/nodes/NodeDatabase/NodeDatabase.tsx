import Image from 'next/image'
import { type NodeProps } from 'react-flow-renderer'

import IconContainerStereo from '../../../components/icons/IconContainerStereo'
import type { NodeDataDatabase } from '../../../diagram.type'
import NodeWrapper from '../kit/NodeWrapper'

export default function NodeDatabase(node: NodeProps<NodeDataDatabase>) {
  const { label, icon } = node.data

  return (
    <NodeWrapper {...node}>
      <div className="flex flex-col items-center justify-center p-5">
        <div className="mb-2">
          <IconContainerStereo>
            {icon ? <Image height={32} src={`/icons/${icon}.svg`} width={32} /> : null}
          </IconContainerStereo>
        </div>

        <span>{label}</span>
      </div>
    </NodeWrapper>
  )
}
