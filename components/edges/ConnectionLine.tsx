import { type ConnectionLineComponentProps, getSmoothStepPath } from 'react-flow-renderer'

import { COLOR_FLOW_EDGE } from '../../diagram.config'

export default function ConnectionLine({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  sourceNode,
}: ConnectionLineComponentProps) {
  if (!sourceNode) {
    return null
  }

  const d = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetPosition,
    targetX,
    targetY,
  })

  return (
    <g>
      <path className="animated" d={d} fill="none" stroke={COLOR_FLOW_EDGE} strokeWidth={2.3} />
      <circle
        cx={targetX}
        cy={targetY}
        fill="#fff"
        r={3}
        stroke={COLOR_FLOW_EDGE}
        strokeWidth={1.5}
      />
    </g>
  )
}
