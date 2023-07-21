import * as Yup from 'yup'

const formikInitialValuesFunc = (data) => {
  const formikInitialValues = {
    id: 0,
    name: '',
    colour: '#000',
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    name: Yup.string().required('Required!'),
    colour: Yup.string().required('Required!'),
  })
  return formValidation
}

const formInputsFunc = (data) => {
  const formInput = [
    {
      label: 'Name',
      placeholder: 'Enter name',
      class: 'col-sm-6 col-12',
      type: 'text',
      name: 'name',
    },
    {
      type: 'color',
      name: 'colour',
      label: 'Badge color',
      class: 'col-sm-6 col-12',
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
