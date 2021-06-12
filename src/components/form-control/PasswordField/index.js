import { CInput } from '@coreui/react'
import { useController } from 'react-hook-form'

const PasswordField = (props) => {
  const { name, form, placeholder } = props

  const {
    field: { onChange: onChangeController, value, ...inputProps }
  } = useController({
    name,
    control: form.control
  })

  const onChangeValue = (event) => {
    const { value } = event.target
    onChangeController(value)
  }

  return (
    <CInput
      {...inputProps}
      type="password"
      onChange={onChangeValue}
      value={value}
      placeholder={placeholder}
    />
  )
}

export default PasswordField
