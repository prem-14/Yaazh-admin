import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    name: '',
    description: '',
    image: '',
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    name: Yup.string().required('Required!'),
    description: Yup.string().required('Required!'),
    image: Yup.array()
      .of(
        Yup.object().shape({
          public_id: Yup.string().required('Public Id required'),
          url: Yup.string().required('Url required'),
        })
      )
      .min(1, 'Image Required')
      .max(1, 'Maximum of 1 image is allowed'),
  })
  return formValidation
}

const formInputsFunc = (data) => {
  const formInput = [
    {
      label: 'Name',
      placeholder: 'Enter name',
      class: 'col-12',
      type: 'text',
      name: 'name',
    },
    {
      class: 'col-12',
      name: 'description',
      type: 'ckeditor',
    },
    {
      label: 'Upload images *',
      labelDesc: 'Recommended dimensions: 500px * 500px',
      name: 'image',
      type: 'imageUploads',
      class: 'col-12',
      multiple: true,
      accept: 'image',
      info: {
        from: 'ingredient',
        id: data.id || 0,
      },
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
