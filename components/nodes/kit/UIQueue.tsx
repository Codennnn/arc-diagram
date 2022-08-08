import cn from 'classnames'

import UIBase from './UIBase'

export default function UIQueue(props: { children?: React.ReactNode; bgWhite?: boolean }) {
  return (
    <div className="px-[0.65rem]">
      <div className={cn('relative bg-node-container', { '!bg-white': props.bgWhite })}>
        <UIBase className={cn({ '!bg-white': props.bgWhite })} position="left" />
        <UIBase dashed className={cn({ '!bg-white': props.bgWhite })} position="right" />

        <div className="absolute inset-x-0 top-0 h-[2px] bg-current" />
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-current" />

        <div className="relative z-10 min-h-[2.3rem] min-w-[5rem]">{props.children}</div>
      </div>
    </div>
  )
}
