import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    name: '',
    display: true,
    description: '',
    position: null,
    parent_id: 0,
  }
  return formikInitialValues
}

const formValidationFunc = (data) => {
  const formValidation = Yup.object({
    name: Yup.string().required('Required!'),
    display: Yup.boolean().required('Required!'),
    parent_id: Yup.string().required('Required!'),
  })
  return formValidation
}

const formInputsFunc = (data) => {
  const formInput = [
    {
      label: 'Name *',
      placeholder: 'Enter category name',
      class: 'col-sm-6 col-12',
      type: 'text',
      name: 'name',
    },
    {
      label: 'Description (optional)',
      placeholder: 'Enter description',
      type: 'textarea',
      class: 'col-sm-6 col-12',
      name: 'description',
    },
    {
      label: 'Position',
      placeholder: 'Enter position',
      class: `col-md-6 col-12`,
      type: 'text',
      name: 'position',
    },
    {
      label: 'Parent Category',
      type: 'select',
      class: `col-md-6 col-12`,
      name: 'parent_id',
      nested: true,
      options: data.nestedCategories,
    },
    {
      title: 'Display',
      type: 'radio',
      name: 'display',
      class: 'col-sm-6 col-md-4 col-12',
      item: [
        { id: true, description: 'Yes' },
        { id: false, description: 'No' },
      ],
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
