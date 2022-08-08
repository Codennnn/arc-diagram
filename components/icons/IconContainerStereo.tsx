import IconDefaultDatabase from './IconDefaultDatabase'

const defaultIcon = (
  <div className="relative bottom-1 h-[32px] w-[32px]">
    <IconDefaultDatabase />
  </div>
)

export default function IconContainerStereo(props: { children?: React.ReactNode }) {
  return (
    <div className="py-2">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-20 aspect-[4_/_1] -translate-y-1/2 rounded-[50%] border-2 border-solid border-current" />
        <div
          className="absolute inset-x-0 bottom-0 z-0 aspect-[4_/_1] translate-y-1/2 rounded-[50%] border-2 border-solid border-current"
          style={{ borderTop: '2px dashed #94a3b8' }}
        />

        <div className="absolute inset-y-0 left-0 w-[2px] bg-current" />
        <div className="absolute inset-y-0 right-0 w-[2px] bg-current" />

        <div className="relative z-10 flex items-center justify-center px-4 pt-4 pb-3">
          {props.children || defaultIcon}
        </div>
      </div>
    </div>
  )
}
