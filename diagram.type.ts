import type { Edge, Node, ReactFlowInstance } from 'react-flow-renderer'

import type { ContainerType } from './diagram.enum'

interface NodeDataCommon {
  label?: string
  container: ContainerType
  layout?: 'vertical' | 'horizontal'
}

export interface NodeDataDatabase extends NodeDataCommon {
  icon?: string
}

export interface NodeDataService extends NodeDataCommon {
  icon?: string
}

export interface NodeDataUsers extends NodeDataCommon {
  icon?: 'desktop' | 'laptop' | 'mobile'
}

export interface NodeDataQueue extends NodeDataCommon {
  icon?: string
}

export type NodeData = NodeDataDatabase | NodeDataService | NodeDataUsers | NodeDataQueue

export interface EdgeData {
  text?: string
}

export type ElementNode = Node<NodeData>
export type ElementEdge = Edge<EdgeData>

export type FlowInstance = ReactFlowInstance<NodeData, EdgeData>

export interface Diagram {
  flowData: { nodes: ElementNode[]; edges: ElementEdge[] } | null
}
