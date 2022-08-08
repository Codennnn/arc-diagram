import { presetNodes } from '../../diagram.config'
import { NodeType } from '../../diagram.enum'
import IconContainerFrame from '../icons/IconContainerFrame'
import IconContainerStereo from '../icons/IconContainerStereo'
import IconUserDesktop from '../icons/IconUserDesktop'
import UIQueue from '../nodes/kit/UIQueue'

const NodeRender = (props: { nodeType: NodeType }) => {
  switch (props.nodeType) {
    case NodeType.Database:
      return <IconContainerStereo />

    case NodeType.Service:
      return <IconContainerFrame />

    case NodeType.Users:
      return <IconUserDesktop />

    case NodeType.Queue:
      return <UIQueue bgWhite />

    default:
      return null
  }
}

export default function FlowSidebar() {
  return (
    <div className="relative z-50 p-5">
      <div className="flex h-full w-52 flex-col gap-y-5">
        <div className="flex flex-1 flex-col gap-y-4 overflow-hidden rounded-lg bg-white py-8 px-4 shadow-lg">
          {presetNodes.map(({ type, data }) => {
            return (
              <div key={type} className="flex flex-col items-center">
                <div
                  draggable
                  className="mx-auto flex cursor-grab flex-col items-center justify-center overflow-hidden rounded-md bg-transparent"
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/reactflow', type)
                    e.dataTransfer.effectAllowed = 'move'
                  }}
                >
                  <NodeRender nodeType={type} />
                </div>
                <span className="mt-2">{data.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
