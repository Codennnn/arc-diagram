import { CubeTransparentIcon, MinusIcon, PhotographIcon, PlusIcon } from '@heroicons/react/outline'
import cn from 'classnames'
import html2canvas from 'html2canvas'
import { useEffect, useState } from 'react'

import { ANIMATE_DURATION, DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM } from '../../diagram.config'
import { useDiagramContext } from '../../diagram.context'

interface ButtonBoxProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode
  tooltip?: string
}

const ButtonBox = ({ children, className, tooltip, ...props }: ButtonBoxProps) => {
  const button = (
    <button
      title={tooltip}
      type="button"
      {...props}
      className={cn(
        'flex justify-center items-center p-2 w-9 h-9 font-bold disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  )

  return button
}

export default function FlowControl() {
  const { rfInstance } = useDiagramContext()

  const [zoomValue, setZoomValue] = useState(DEFAULT_ZOOM)

  const zoomTo = (v: number) => {
    setZoomValue(Number(v.toFixed(1)))
  }

  useEffect(() => {
    rfInstance.zoomTo(zoomValue, { duration: ANIMATE_DURATION })
  }, [rfInstance, zoomValue])

  const handleDownload = async () => {
    const diagram = window.document.querySelector<HTMLElement>('.react-flow__renderer')

    if (diagram) {
      const canvas = await html2canvas(diagram, {
        backgroundColor: null,
      })

      const dataURL = canvas.toDataURL()

      const trigger = document.createElement('a')
      trigger.href = dataURL
      trigger.download = `${'diagram'}.png`
      trigger.click()
    }
  }

  return (
    <div className="absolute bottom-5 left-6 z-50 flex select-none items-center">
      <div className="mr-4 flex items-center rounded-lg bg-white text-main-600 shadow-lg shadow-main-200">
        <ButtonBox
          disabled={zoomValue <= MIN_ZOOM}
          onClick={() => zoomTo((zoomValue * 100 - 10) / 100)}
        >
          <MinusIcon />
        </ButtonBox>

        <div className="min-w-[50px] text-center font-bold">{Math.floor(zoomValue * 100)}%</div>

        <ButtonBox
          disabled={zoomValue >= MAX_ZOOM}
          onClick={() => zoomTo((zoomValue * 100 + 10) / 100)}
        >
          <PlusIcon />
        </ButtonBox>
      </div>

      <div className="flex items-center rounded-lg bg-white text-base shadow-lg shadow-main-200">
        <ButtonBox
          tooltip="居中显示"
          onClick={() => {
            rfInstance.fitView({
              minZoom: zoomValue,
              maxZoom: zoomValue,
              duration: ANIMATE_DURATION,
            })
          }}
        >
          <CubeTransparentIcon />
        </ButtonBox>

        <ButtonBox tooltip="保存为图片" onClick={handleDownload}>
          <PhotographIcon />
        </ButtonBox>
        <ButtonBox
          tooltip="打印流程图数据"
          onClick={() => console.log('ReactFlow data:\n', rfInstance.toObject())}
        >
          @
        </ButtonBox>
      </div>
    </div>
  )
}
