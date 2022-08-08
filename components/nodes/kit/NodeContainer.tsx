import { type NodeProps } from 'react-flow-renderer'

import { ContainerType, NodeType } from '../../../diagram.enum'
import type { NodeData } from '../../../diagram.type'
import UILayer from './UILayer'
import UIQueue from './UIQueue'

interface NodeContainerProps extends NodeProps<NodeData> {
  children?: React.ReactNode
}

export default function NodeContainer(props: NodeContainerProps) {
  const { children, type, data } = props

  if (type === NodeType.Queue) {
    return <UIQueue>{children}</UIQueue>
  }

  switch (data.container) {
    case ContainerType.Multiple: {
      return (
        <div className="relative">
          <UILayer>{children}</UILayer>
          <UILayer className="absolute top-[6px] left-[6px] -z-10 h-full w-full !border-main-500 !bg-main-200" />
        </div>
      )
    }

    case ContainerType.Single:
      return <UILayer>{children}</UILayer>

    case ContainerType.External:
      return <UILayer className="!border-dashed">{children}</UILayer>

    case ContainerType.None:
      return <>{children}</>

    default:
      throw new Error(`无效的 container type: ${type}.`)
  }
}
