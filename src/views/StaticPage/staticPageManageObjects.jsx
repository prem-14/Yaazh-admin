import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    title: '',
    content: '',
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    title: Yup.string().required('Required!'),
    content: Yup.string().required('Required!'),
  })
  return formValidation
}

const formInputsFunc = (data) => {
  const formInput = [
    {
      label: 'Title',
      placeholder: 'Enter title',
      class: 'col-12',
      type: 'text',
      name: 'title',
    },
    {
      class: 'col-12',
      name: 'content',
      type: 'ckeditor',
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
