import { Checkbox } from 'antd'
import { CheckboxOptionType, CheckboxValueType } from 'antd/lib/checkbox/Group'

interface Props {
  value: CheckboxValueType[]
  options: Array<CheckboxOptionType>
  onChange: (value: CheckboxValueType[]) => void
  allSelectText?: string
}

export function MyCheckbox(props: Props) {
  const { value, options, onChange, allSelectText } = props
  const defaultValue = options.map((e) => e.value)

  function onAllChecked(checked: boolean) {
    onChange(checked ? defaultValue : [])
  }

  function onOneChecked(checked: boolean, option: CheckboxOptionType) {
    if (checked) {
      onChange([...value, option.value])
    } else {
      onChange(value.filter((e) => e !== option.value))
    }
  }

  return (
    <>
      <Checkbox
        key="All"
        checked={value.length === options.length}
        children={allSelectText ?? 'All'}
        onChange={(e) => onAllChecked(e.target.checked)}
      />
      {options.map((option) => (
        <Checkbox
          key={option.value as string}
          checked={value.includes(option.value)}
          children={option.label}
          onChange={(e) => {
            onOneChecked(e.target.checked, option)
          }}
        />
      ))}
    </>
  )
}
