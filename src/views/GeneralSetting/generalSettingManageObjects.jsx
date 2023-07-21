import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    variable: '',
    question: '',
    value: '',
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    variable: Yup.string().required('Required!'),
    question: Yup.string().required('Required!'),
    value: Yup.string().required('Required!'),
  })
  return formValidation
}

const formInputsFunc = (data) => {
  const formInput = [
    {
      label: 'Variable',
      placeholder: 'Enter variable',
      class: `col-12 ${data.status === 'edit' && 'd-none'}`,
      type: 'text',
      name: 'variable',
    },
    {
      label: 'Question',
      placeholder: 'Enter question',
      class: 'col-12',
      type: 'text',
      name: 'question',
    },
    {
      label: 'Value',
      placeholder: 'Enter value',
      class: 'col-12',
      type: 'text',
      name: 'value',
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
