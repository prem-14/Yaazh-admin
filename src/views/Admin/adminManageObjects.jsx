import * as Yup from 'yup'
import { permissions } from '@/utils/permissions'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    email: '',
    confirm_email: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: 'admin',
    permissions: permissions.map((p) => p.id),
  }
  return formikInitialValues
}

const formValidationFunc = (data) => {
  const formValidation = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required!'),
    confirm_email:
      data.status === 'new'
        ? Yup.string()
            .email('Invalid email format')
            .oneOf([Yup.ref('email')], "Email's not match")
            .required('Required!')
        : Yup.string(),
    first_name: Yup.string().min(2, 'Mininum 2 characters').max(15, 'Maximum 15 characters').required('Required!'),
    last_name: Yup.string(),
    phone: Yup.string(),
    permissions: Yup.array().min(1, 'at least 1').required('Required!'),
  })
  return formValidation
}

const formInputsFunc = (data) => {
  const adminFormInputs = [
    {
      label: 'First name *',
      type: 'text',
      placeholder: 'Enter your first name',
      class: 'col-sm-6 col-12',
      name: 'first_name',
      autoFocus: true,
    },
    {
      label: 'Last Name',
      placeholder: 'Enter last name',
      type: 'text',
      class: 'col-sm-6 col-12',
      name: 'last_name',
    },
    {
      label: 'Email Address *',
      placeholder: 'Enter email address',
      type: 'text',
      class: 'col-sm-6 col-12',
      name: 'email',
      readonly: data.status === 'edit' ? true : false,
    },
    {
      label: 'Confirm Email Address',
      placeholder: 'Confirm your email address',
      type: 'text',
      class: `col-sm-6 col-12 ${data.status === 'edit' && 'd-none'}`,
      name: 'confirm_email',
    },
    {
      label: 'Phone Number',
      placeholder: 'Enter phone number',
      type: 'text',
      class: 'col-sm-6 col-12',
      name: 'phone',
    },
  ]

  const adminPermissionInput = [
    {
      type: 'checkboxarray',
      class: 'empPermissions d-flex align-items-center flex-wrap',
      name: 'permissions',
      options: permissions,
    },
  ]

  return { adminFormInputs, adminPermissionInput }
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
