import * as Yup from 'yup'

const formikInitialValuesFunc = (data) => {
  const formikInitialValues = {
    id: 0,
    subject: '',
    template: '',
    title: '',
    method: data.action,
  }
  return formikInitialValues
}

const formValidationFunc = (data) => {
  const formValidation = Yup.object({
    template: Yup.string().required('Required!'),
    subject: Yup.string().required('Required!'),
    title: Yup.string().required('Required!'),
  })
  return formValidation
}

const formInputsFunc = (data) => {
  const emailFormInput = []

  if (data.status === 'new') {
    emailFormInput.push({
      label: 'Title',
      placeholder: 'Enter Title',
      class: 'col-12',
      type: 'text',
      name: 'title',
    })
  }
  emailFormInput.push(
    {
      label: 'Subject',
      placeholder: 'Enter subject',
      class: 'col-12',
      type: 'text',
      shrink: true,
      name: 'subject',
    },
    {
      class: 'col-12',
      name: 'template',
      type: 'ckeditor',
    }
  )

  const smsFormInput = []

  if (data.status === 'new') {
    smsFormInput.push({
      label: 'Title',
      placeholder: 'Enter Title',
      class: 'col-12',
      type: 'text',
      shrink: true,
      name: 'title',
    })
  }
  smsFormInput.push({
    label: 'Template',
    placeholder: 'Enter Template',
    class: 'col-12',
    type: 'text',
    name: 'template',
  })

  return { emailFormInput, smsFormInput }
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
