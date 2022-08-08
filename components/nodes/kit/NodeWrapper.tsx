import { XIcon } from '@heroicons/react/outline'
import { type NodeProps, Handle, Position } from 'react-flow-renderer'

import useDiagramHelper from '../../../diagram.helper'
import type { NodeData } from '../../../diagram.type'
import NodeContainer from './NodeContainer'

interface NodeWrapperProps<T> extends NodeProps<NodeData> {
  children?: React.ReactNode
  removeable?: boolean
}

export default function NodeWrapper<T = NodeData>(nodeProps: NodeWrapperProps<T>) {
  const { children, removeable = true, ...node } = nodeProps

  const { removeNode } = useDiagramHelper()

  return (
    <div className="group relative text-sm">
      {removeable && (
        <div className="absolute top-1 right-1 translate-x-full -translate-y-full cursor-pointer overflow-hidden opacity-0 transition-opacity group-hover:opacity-100">
          <button
            className="flex h-5 w-5 items-center justify-center rounded-full bg-main-200 text-xs text-main-400 hover:text-main-600"
            title="移除"
            onClick={(e) => {
              e.stopPropagation()
              removeNode(node.id)
            }}
          >
            <XIcon />
          </button>
        </div>
      )}

      <NodeContainer {...node}>{children}</NodeContainer>

      <Handle id="top" isConnectable={node.isConnectable} position={Position.Top} type="target" />
      <Handle id="left" isConnectable={node.isConnectable} position={Position.Left} type="target" />

      <Handle
        id="right"
        isConnectable={node.isConnectable}
        position={Position.Right}
        type="source"
      />
      <Handle
        id="bottom"
        isConnectable={node.isConnectable}
        position={Position.Bottom}
        type="source"
      />
    </div>
  )
}
