import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid email format').required('Required!'),
    phone: Yup.string().required('Required!'),
    address: Yup.string().required('Required!'),
  })
  return formValidation
}

const formInputsFunc = () => {
  const formInputs = [
    {
      label: 'Name',
      placeholder: 'Enter name',
      class: 'col-12 col-sm-6',
      type: 'text',
      name: 'name',
    },
    {
      label: 'Email',
      placeholder: 'Enter email address',
      class: 'col-12 col-sm-6',
      type: 'text',
      name: 'email',
    },
    {
      label: 'Phone Number',
      placeholder: 'Enter phone number',
      class: 'col-12 col-sm-6',
      type: 'text',
      name: 'phone',
    },
    {
      label: 'Address',
      placeholder: 'Enter  address',
      class: 'col-12 col-sm-6',
      type: 'text',
      name: 'address',
    },
  ]

  return formInputs
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
