import cn from 'classnames'

export default function UIBase(props: {
  position: 'top' | 'bottom' | 'left' | 'right'
  dashed?: boolean
  className?: string
}) {
  const extraClass = {
    top: 'top-0 left-0 -translate-x-1/2 rotate-90',
    bottom: 'bottom-0 left-0 -translate-x-1/2 rotate-90',
    left: 'top-0 left-0 -translate-x-1/2',
    right: 'top-0 right-0 translate-x-1/2',
  }[props.position]

  return (
    <div
      className={cn(
        'absolute z-20 aspect-[1_/_2] h-full rounded-[50%] border-2 border-solid border-current bg-node-container',
        extraClass,
        props.className
      )}
      style={
        props.dashed
          ? {
              [`border${
                { top: 'Bottom', bottom: 'Top', left: 'Right', right: 'Left' }[props.position]
              }`]: '2px dashed #94a3b8',
            }
          : undefined
      }
    />
  )
}
