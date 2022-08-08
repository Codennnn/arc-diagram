import { createContext, useContext, useState } from 'react'
import { useReactFlow } from 'react-flow-renderer'

import type { Diagram, ElementEdge, ElementNode, FlowInstance } from './diagram.type'

interface FlowContextValue {
  rfInstance: FlowInstance

  digramData: Diagram | undefined
  setDiagramData: React.Dispatch<React.SetStateAction<Diagram | undefined>>

  editingNode: ElementNode | undefined
  setEditingNode: React.Dispatch<React.SetStateAction<ElementNode | undefined>>

  editingEdge: ElementEdge | undefined
  setEditingEdge: React.Dispatch<React.SetStateAction<ElementEdge | undefined>>
}

const DiagramContext = createContext<FlowContextValue>({} as FlowContextValue)

interface FlowContextProviderProps {
  children?: React.ReactNode
}

export default function FlowContextProvider(props: FlowContextProviderProps) {
  const [digramData, setDiagramData] = useState<Diagram>()
  const [editingNode, setEditingNode] = useState<ElementNode>()
  const [editingEdge, setEditingEdge] = useState<ElementEdge>()

  return (
    <DiagramContext.Provider
      value={{
        rfInstance: useReactFlow(),

        digramData,
        setDiagramData,

        editingNode,
        setEditingNode,

        editingEdge,
        setEditingEdge,
      }}
    >
      {props.children}
    </DiagramContext.Provider>
  )
}

export function useDiagramContext() {
  return useContext(DiagramContext)
}
