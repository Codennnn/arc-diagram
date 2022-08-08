import { NodeType } from './diagram.enum'

export const COLOR_FLOW_EDGE = '#94a3b8'

/** React Flow 的配置参数 */
export const DEFAULT_ZOOM = 1
export const MAX_ZOOM = 1.5
export const MIN_ZOOM = 0.5
export const GRID_GAP = 18
export const ANIMATE_DURATION = 200

interface NodeConfig {
  type: NodeType
  data: {
    label: string
  }
}

export const presetNodes: NodeConfig[] = [
  { type: NodeType.Database, data: { label: '数据库' } },
  { type: NodeType.Service, data: { label: '应用服务' } },
  { type: NodeType.Queue, data: { label: '队列' } },
  { type: NodeType.Users, data: { label: '客户端' } },
]

export const nodeConfigMap = new Map<NodeType, NodeConfig>(
  presetNodes.map((node) => [node.type, node])
)
