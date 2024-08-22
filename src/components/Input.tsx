import { useContext, useState } from 'react'
import FormContext from '../contexts/register-plant/form-context'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
export default function Input(props: Props) {
  const { newProduct, setNewProduct, validation } = useContext(FormContext)
  const [error, setError] = useState<string | null | boolean>(false)
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const newProductPropName = event.target.name
    const newProductValueToProp = event.target.value
    setNewProduct({
      ...newProduct,
      [newProductPropName]: newProductValueToProp,
    })
  }
  function validateField(event: React.FocusEvent<HTMLInputElement>) {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    const error = validation.validate(fieldName, fieldValue)
    setError(error)
  }
  return (
    <div className="relative">
      <input
        {...props}
        className={`${props.className}  ${
          error === false
            ? ''
            : error === null
            ? 'border-green-400'
            : 'border-red-400'
        }`}
        onChange={handleChange}
        onBlur={validateField}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}
