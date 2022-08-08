import cn from 'classnames'
import Image from 'next/image'
import { type NodeProps } from 'react-flow-renderer'

import IconContainerFrame from '../../../components/icons/IconContainerFrame'
import type { NodeData } from '../../../diagram.type'
import NodeWrapper from '../kit/NodeWrapper'

export default function NodeService(node: NodeProps<NodeData>) {
  const { label, icon, layout = 'vertical' } = node.data

  return (
    <NodeWrapper {...node}>
      <div
        className={cn('p-5 flex justify-center items-center', {
          'flex-col': layout === 'vertical',
        })}
      >
        <div className={cn(layout === 'vertical' ? 'mb-2' : 'mr-4')}>
          <IconContainerFrame>
            {icon ? <Image height={27} src={`/icons/${icon}.svg`} width={27} /> : null}
          </IconContainerFrame>
        </div>

        <span>{label}</span>
      </div>
    </NodeWrapper>
  )
}
