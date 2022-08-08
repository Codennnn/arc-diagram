import cn from 'classnames'

export default function UILayer(props: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-md border-2 border-solid border-current bg-main-50 overflow-hidden',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
