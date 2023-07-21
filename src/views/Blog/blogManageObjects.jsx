import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    title: '',
    content: '',
    image: '',
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    title: Yup.string().required('Required!'),
    content: Yup.string().required('Required!'),
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
      label: 'Title',
      placeholder: 'Enter title',
      class: 'col-12',
      type: 'text',
      name: 'title',
    },
    {
      class: 'col-12',
      name: 'content',
      type: 'editor',
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
        from: 'blog',
        id: data.id || 0,
      },
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
