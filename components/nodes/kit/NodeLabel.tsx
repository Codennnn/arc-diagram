import { type NodeProps } from 'react-flow-renderer'

import useDiagramHelper from '../../../diagram.helper'
import type { NodeData } from '../../../diagram.type'
import EditableText from '../../EditableText'

type NodeLabelProps = NodeProps<NodeData>

export default function NodeLabel(nodeProps: NodeLabelProps) {
  const { updateNode } = useDiagramHelper()

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <EditableText
        value={nodeProps.data.label}
        wrapperClassName="w-full"
        onChange={(newLabel) => {
          updateNode(nodeProps.id, { label: newLabel })
        }}
      />
    </div>
  )
}
