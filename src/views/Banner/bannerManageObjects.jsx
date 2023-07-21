import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    title: '',
    link: '',
    description: '',
    image: '',
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    title: Yup.string().required('Required!'),
    link: Yup.string(),
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
      label: 'Upload image *',
      labelDesc: 'Recommended dimensions: 2000px * 550px',
      name: 'image',
      type: 'imageUploads',
      class: 'col-12',
      multiple: false,
      accept: 'image',
      info: {
        from: 'banner',
        id: data.id || 0,
      },
    },
    {
      label: 'Title',
      placeholder: 'Enter title',
      class: 'col-sm-6 col-12',
      type: 'text',
      name: 'title',
    },
    {
      label: 'Link',
      placeholder: 'Enter link',
      class: 'col-sm-6 col-12',
      type: 'text',
      name: 'link',
    },
    {
      label: 'Description',
      placeholder: 'Enter description',
      class: 'col-12',
      type: 'text',
      name: 'description',
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
