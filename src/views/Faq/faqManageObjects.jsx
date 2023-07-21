import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    question: '',
    answer: '',
    category: '',
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    question: Yup.string().required('Required!'),
    answer: Yup.string().required('Required!'),
    category: Yup.string().required('Required!'),
  })
  return formValidation
}

const formInputsFunc = () => {
  const formInput = [
    {
      label: 'Question',
      placeholder: 'Enter question',
      class: 'col-12',
      type: 'text',
      name: 'question',
    },
    {
      type: 'ckeditor',
      name: 'answer',
      label: 'Answer',
      class: 'col-12',
    },
    {
      type: 'text',
      name: 'category',
      label: 'Category',
      class: 'col-12',
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
