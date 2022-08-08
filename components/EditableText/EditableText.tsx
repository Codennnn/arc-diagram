import { Input } from 'antd'
import { useState } from 'react'

interface EditableTextProps {
  value?: string
  autoSelectAll?: boolean
  onChange?: (value: string) => void
  onBlur?: (value: string) => void

  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
  title?: string
}

export default function EditableText(props: EditableTextProps) {
  const { onChange, onBlur, autoSelectAll } = props

  const [editing, setEditing] = useState(false)

  return (
    <div className={props.wrapperClassName} style={props.wrapperStyle} title={props.title}>
      {editing ? (
        <Input
          autoFocus
          value={props.value}
          onBlur={(e) => {
            onBlur?.(e.target.value)
            setEditing(false)
          }}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={(e) => {
            if (autoSelectAll) {
              e.target.select()
            }
          }}
        />
      ) : (
        <div
          className="cursor-text rounded-sm py-[2px] px-1 transition-colors hover:bg-main-100"
          onClick={() => setEditing(true)}
        >
          <span>{props.value}</span>
        </div>
      )}
    </div>
  )
}
