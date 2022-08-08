import IconDefaultService from './IconDefaultService'

const defaultIcon = (
  <div className="relative top-1 h-[27px] w-[27px]">
    <IconDefaultService />
  </div>
)

export default function IconContainerFrame(props: { children?: React.ReactNode }) {
  return (
    <div className="min-w-[3.5rem] overflow-hidden rounded-md border-2 border-solid border-current">
      <div className="flex h-4 items-center border-0 border-b-2 border-solid px-[0.3rem]">
        <span className="mr-[3px] h-1 w-1 rounded-full bg-current" />
        <span className="mr-[3px] h-1 w-1 rounded-full bg-current" />
        <span className="h-1 w-1 rounded-full bg-current" />
      </div>

      <div className="flex items-center justify-center py-1">{props.children || defaultIcon}</div>
    </div>
  )
}
