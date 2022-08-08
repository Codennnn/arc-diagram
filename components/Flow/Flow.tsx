import { nanoid } from 'nanoid'
import { type DragEventHandler, useCallback, useEffect } from 'react'
import ReactFlow, {
  type Connection,
  type ConnectionLineComponent,
  type NodeMouseHandler,
  Background,
  BackgroundVariant,
  MarkerType,
  useEdgesState,
  useNodesState,
} from 'react-flow-renderer'

import NodeSetting from '../../components/NodeSetting'
import {
  COLOR_FLOW_EDGE,
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  nodeConfigMap,
} from '../../diagram.config'
import { useDiagramContext } from '../../diagram.context'
import { diagramTemplate } from '../../diagram.data'
import type { NodeType } from '../../diagram.enum'
import { ContainerType, EdgeType } from '../../diagram.enum'
import useDiagramHelper from '../../diagram.helper'
import type { EdgeData, ElementEdge, ElementNode, NodeData } from '../../diagram.type'
import ConnectionLine from '../edges/ConnectionLine'
import edgeTypes from '../edges/edge-types'
import FlowControl from '../FlowControl'
import nodeTypes from '../nodes/node-types'
import FlowSidebar from './FlowSidebar'

export default function Flow() {
  const { rfInstance, digramData, setDiagramData, setEditingNode } = useDiagramContext()

  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeData>([])

  useEffect(() => {
    setDiagramData(diagramTemplate)
  }, [setDiagramData])

  useEffect(() => {
    if (digramData && digramData.flowData) {
      const flowNodes = digramData.flowData.nodes
      setNodes((prevNodes) => {
        if (prevNodes.length <= 0) {
          return flowNodes
        }

        return flowNodes.map((node, i) => {
          if (prevNodes[i] && node.id === prevNodes[i].id) {
            return { ...node, position: prevNodes[i].position }
          }
          return node
        })
      })
      setEdges(digramData.flowData?.edges)
    }
  }, [digramData, setNodes, setEdges])

  const { createNode, createEdge, resetEdge } = useDiagramHelper()

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      setEditingNode(node)
    },
    [setEditingNode]
  )

  const handleEdgeConnect = useCallback(
    (newEdge: ElementEdge | Connection) => {
      createEdge({
        ...newEdge,
        id: nanoid(5),
        type: EdgeType.Text,
        markerEnd: {
          type: MarkerType.Arrow,
          color: COLOR_FLOW_EDGE,
          width: 15,
          height: 15,
          strokeWidth: 1.3,
        },
      })
    },
    [createEdge]
  )

  const handleEdgeUpdate = useCallback(
    (oldEdge: ElementEdge, newConnection: Connection) => {
      resetEdge(oldEdge, newConnection)
    },
    [resetEdge]
  )

  const handleNodeCreate = useCallback(
    (nodeEle: { type: NodeType; position: ElementNode['position'] }) => {
      const { data } = nodeConfigMap.get(nodeEle.type)!

      createNode({
        id: nanoid(5),
        type: nodeEle.type,
        data: { label: data.label, container: ContainerType.Single },
        position: rfInstance.project(nodeEle.position),
      })
    },
    [createNode, rfInstance]
  )

  const handleDragOver: DragEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault()

      const reactFlowBounds = e.currentTarget.getBoundingClientRect()
      const type = e.dataTransfer.getData('application/reactflow') as NodeType

      handleNodeCreate({
        type,
        position: {
          x: e.clientX - reactFlowBounds.left,
          y: e.clientY - reactFlowBounds.top,
        },
      })
    },
    [handleNodeCreate]
  )

  return (
    <div className="flex h-full w-full">
      <FlowSidebar />

      <div className="relative h-full flex-1">
        <ReactFlow
          fitView
          connectionLineComponent={ConnectionLine as unknown as ConnectionLineComponent}
          defaultZoom={DEFAULT_ZOOM}
          edgeTypes={edgeTypes}
          edges={edges}
          fitViewOptions={{ maxZoom: DEFAULT_ZOOM }}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
          nodeTypes={nodeTypes}
          nodes={nodes}
          panOnScroll={true}
          onConnect={handleEdgeConnect}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onEdgeUpdate={handleEdgeUpdate}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          onNodesChange={onNodesChange}
        />
        <FlowControl />
      </div>

      <Background color="#dedede" size={0.9} variant={BackgroundVariant.Dots} />

      <NodeSetting />
    </div>
  )
}
