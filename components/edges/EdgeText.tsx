import { type EdgeProps, getSmoothStepPath } from 'react-flow-renderer'

import type { EdgeData } from '../../diagram.type'

export default function EdgeText(props: EdgeProps<EdgeData>) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {
      margin: 10,
      cursor: 'pointer',
      strokeWidth: 2.3,
    },
    markerEnd,
  } = props

  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  return (
    <g>
      <path
        className="react-flow__edge-path"
        d={edgePath}
        id={id}
        markerEnd={markerEnd}
        style={style}
      />
    </g>
  )
}
