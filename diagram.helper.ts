import immer from 'immer'
import { useCallback } from 'react'
import { type Connection, isEdge, isNode } from 'react-flow-renderer'

import { useDiagramContext } from './diagram.context'
import type { Diagram, ElementEdge, ElementNode, NodeData } from './diagram.type'

type FlowData = NonNullable<Diagram['flowData']>

export default function useDiagramHelper() {
  const { setDiagramData } = useDiagramContext()

  const produceFlow = useCallback(
    (produce: (flowData: FlowData) => void): void => {
      setDiagramData((prevDiagram) => {
        if (!prevDiagram || !prevDiagram.flowData) {
          throw new Error('flowData 未完成初始化，不能修改。')
        }

        const newFlowData = immer(prevDiagram.flowData, (draft) => {
          produce(draft)
          return draft
        })

        return {
          ...prevDiagram,
          flowData: newFlowData,
        }
      })
    },
    [setDiagramData]
  )

  const createNode = useCallback(
    (nodeEle: ElementNode) => {
      if (isNode(nodeEle)) {
        produceFlow((state) => {
          state.nodes.push(nodeEle)
        })
      } else {
        throw new TypeError('无法创建节点，因为传入的是一个无效的节点。')
      }
    },
    [produceFlow]
  )

  const updateNode = useCallback(
    (nodeId: string, newNodeData: Partial<NodeData>) => {
      return produceFlow((state) => {
        const idx = state.nodes.findIndex((nd) => nd.id === nodeId)
        state.nodes[idx] = {
          ...state.nodes[idx],
          data: { ...state.nodes[idx].data, ...newNodeData },
        }
      })
    },
    [produceFlow]
  )

  const removeNode = useCallback(
    (nodeId: string) => {
      produceFlow((state) => {
        const removedNode = state.nodes.find((nd) => nd.id === nodeId)
        state.nodes = state.nodes.filter((nd) => nd.id !== removedNode?.id)
        state.edges = state.edges.filter(
          (ed) => ed.source !== removedNode?.id && ed.target !== removedNode?.id
        )
      })
    },
    [produceFlow]
  )

  const createEdge = useCallback(
    (edgeEle: ElementEdge | Connection) => {
      if (isEdge(edgeEle)) {
        produceFlow((state) => {
          state.edges.push(edgeEle)
        })
      } else {
        throw new Error('无法创建边，因为传入的是一个无效的边。')
      }
    },
    [produceFlow]
  )

  const removeEdge = useCallback(
    (edgeEle: ElementEdge) => {
      if (isEdge(edgeEle)) {
        produceFlow((state) => {
          const idx = state.edges.findIndex((ed) => ed.id === edgeEle.id)
          state.edges.splice(idx, 1)
        })
      } else {
        throw new Error('无法移除边，因为传入的是一个无效的边。')
      }
    },
    [produceFlow]
  )

  const resetEdge = useCallback(
    (oldEdgeEle: ElementEdge, newConnection: Connection) => {
      if (isEdge(oldEdgeEle)) {
        const newSource = newConnection.source
        const newTarget = newConnection.target
        if (newSource && newTarget) {
          produceFlow((state) => {
            const idx = state.edges.findIndex((ed) => ed.id === oldEdgeEle.id)
            state.edges[idx] = {
              ...oldEdgeEle,
              source: newSource,
              target: newTarget,
            }
          })
        }
      } else {
        throw new Error('无法修改边，因为传入的是一个无效的边。')
      }
    },
    [produceFlow]
  )

  return {
    createNode,
    updateNode,
    removeNode,
    createEdge,
    removeEdge,
    resetEdge,
  }
}
