import Image from 'next/image'
import { useMemo } from 'react'

import { type IconType, iconSet } from '../../../diagram.data'

interface IconSelectorProps {
  value?: string
  onChange?: (value: string) => void
  iconType?: IconType | IconType[]
}

export default function IconSelector(props: IconSelectorProps) {
  const { value, onChange, iconType } = props

  const iconSetWithType = useMemo(() => {
    if (iconType) {
      return iconSet.filter(({ type }) =>
        typeof iconType === 'string' ? type === iconType : iconType.includes(type)
      )
    }
    return iconSet
  }, [iconType])

  return (
    <div className="grid grid-cols-5 gap-x-2 gap-y-3 p-2">
      {iconSetWithType.map(({ label, value }) => (
        <div
          key={value}
          className="flex cursor-pointer items-center justify-center rounded-md py-2 px-1 hover:bg-main-100"
          title={label}
          onClick={() => onChange?.(value)}
        >
          <Image height={27} src={`/icons/${value}.svg`} width={27} />
        </div>
      ))}
    </div>
  )
}
