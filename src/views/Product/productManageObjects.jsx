import { formatDateTime, validDateCheck } from '@/common/commonFunctions'
import * as Yup from 'yup'

const formikInitialValuesFunc = (data) => {
  const formikInitialValues = {
    id: 0,
    display: true,
    name: '',
    websku: '',
    sku: '',
    is_vegan: true,
    category_id: '',
    short_description: '',
    long_description: '',
    discount_startdate: formatDateTime(new Date()),
    discount_enddate: formatDateTime(new Date()),
    ingredients: [],
    faqs: [],
    how_to_use: '',
    who_to_use: '',
    badge: '',
    images: [],
    qty_avail: 0,
    retail_price: '',
    size: '',
    unit: '',
    discount_option: 'discount_percent',
    discount: 0,
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    name: Yup.string().required('Required!'),
    websku: Yup.string().required('Required!'),
    sku: Yup.string().required('Required!'),
    category_id: Yup.string().required('Required!'),
    short_description: Yup.string().required('Required!'),
    long_description: Yup.string().required('Required!'),
    discount_startdate: Yup.string()
      .nullable()
      .test('validDate', 'Enter a valid date', function (value) {
        return validDateCheck(value)
      }),
    discount_enddate: Yup.string()
      .nullable()
      .test('validDate', 'Enter a valid date', function (value) {
        return validDateCheck(value)
      })
      .test(
        'endDateAfterStartDate',
        'Discount end date must be greater than or equal to discount start date',
        function (value) {
          const startDate = this.parent.discount_startdate
          if (value && startDate) {
            return new Date(value) >= new Date(startDate)
          }
          return true
        }
      ),
    discount_option: Yup.string()
      .oneOf(['discount_percent', 'discount_price'], 'Option must be either "discount_percent" or "discount_price"')
      .required('Required'),
    discount: Yup.number()
      .typeError('Must be a number')
      .required('Required')
      .when('discount_option', (discount_option, schema) => {
        return discount_option.includes('discount_percent') ? schema.max(100, 'Maximum value is 100') : schema
      })
      .when('discount_enddate', ([discount_enddate], schema) => {
        return new Date(discount_enddate) >= new Date() ? schema.positive('Must be positive') : schema
      }),
    images: Yup.array()
      .of(
        Yup.object().shape({
          public_id: Yup.string().required('Public Id required'),
          url: Yup.string().required('Url required'),
        })
      )
      .min(1, 'Minimum 1 image is Required')
      .max(10, 'Maximum of 10 image is allowed'),
    qty_avail: Yup.number().required('Required'),
    retail_price: Yup.number().typeError('Must be a number').required('Required').positive('Must be positive'),
    size: Yup.number().required('Required'),
    unit: Yup.string().required('Required'),
    ingredients: Yup.array(),
    faqs: Yup.array(),
    how_to_use: Yup.string().nullable(),
    who_to_use: Yup.string().nullable(),
    badge: Yup.string().nullable(),
  })
  return formValidation
}

const formInputsFunc = (data, formik) => {
  const formInput = [
    {
      label: 'Product name',
      placeholder: 'Enter product name',
      class: 'col-md-10 col-sm-6 col-12',
      type: 'text',
      name: 'name',
    },
    {
      label: 'Vegan',
      type: 'switch',
      class: 'col-md-2 col-sm-6 col-12',
      name: 'is_vegan',
    },
    {
      label: 'Product websku',
      placeholder: 'Enter websku',
      class: 'col-sm-6 col-12',
      type: 'text',
      name: 'websku',
    },
    {
      label: 'Product sku',
      placeholder: 'Enter skue',
      class: 'col-sm-6 col-12',
      type: 'text',
      name: 'sku',
    },
    {
      label: 'Category',
      type: 'select',
      class: 'col-12',
      name: 'category_id',
      options: data.nestedCategories,
      nested: true,
    },
    {
      label: 'Short description',
      placeholder: 'Enter short description',
      type: 'textarea',
      // rows: 3,
      // multiline: true,
      class: 'col-12',
      name: 'short_description',
    },
    {
      type: 'ckeditor',
      name: 'long_description',
      label: 'Long description',
      class: 'col-12 mb-5',
    },
    {
      label: 'Discount start date',
      placeholder: 'Enter start date',
      type: 'datetime',
      class: 'col-md-6 col-sm-6 col-12',
      name: 'discount_startdate',
      touchedError: false,
    },
    {
      label: 'Discount end date',
      placeholder: 'Enter end date',
      type: 'datetime',
      class: 'col-md-6 col-sm-6 col-12',
      name: 'discount_enddate',
      min: formik.values.discount_startdate,
      touchedError: false,
    },
    {
      label: 'Upload images ',
      name: 'images',
      type: 'imageUploads',
      class: 'col-12',
      multiple: true,
      accept: 'image',
      info: {
        from: 'product',
        id: data.id || 0,
      },
    },
    {
      label: 'Quantity available',
      placeholder: 'Enter qty avail',
      class: 'col-md-3 col-sm-6 col-12',
      type: 'text',
      name: `qty_avail`,
    },
    {
      label: 'Retail Price',
      placeholder: 'Enter retail price',
      class: 'col-md-3 col-sm-6 col-12',
      type: 'text',
      name: `retail_price`,
    },
    {
      label: 'Size',
      placeholder: 'Enter size',
      class: 'col-md-3 col-sm-6 col-12',
      type: 'text',
      name: `size`,
    },
    {
      label: 'Unit',
      type: 'select',
      class: `col-md-3 col-sm-6 col-12`,
      name: `unit`,
      options: [
        { show: 'g', value: 'g' },
        { show: 'Kg', value: 'kg' },
        { show: 'ml', value: 'ml' },
        { show: 'l', value: 'l' },
      ],
    },
    {
      label: 'Select discount option',
      type: 'select',
      class: `col-md-6 col-sm-6 col-12`,
      name: `discount_option`,
      options: [
        { show: 'discount percent', value: 'discount_percent' },
        { show: 'discount price', value: 'discount_price' },
      ],
    },
    {
      label: `Discount ${formik.values.discount_option === 'discount_percent' ? 'Percent' : 'Price'}`,
      placeholder: `Enter discount ${formik.values.discount_option === 'discount_percent' ? 'percent' : 'price'}`,
      class: 'col-md-6 col-sm-6 col-12',
      type: 'text',
      name: `discount`,
    },
    {
      label: 'Faqs',
      type: 'multiselect',
      class: `col-12`,
      name: 'faqs',
      options: data?.faqs?.length
        ? data.faqs.map((faq) => ({
            show: faq.question,
            value: faq.id,
          }))
        : [],
    },
    {
      label: 'Ingredients',
      type: 'multiselect',
      class: `col-md-6 col-12`,
      name: 'ingredients',
      options: data?.ingredients?.length
        ? data.ingredients.map((ingredient) => ({
            show: ingredient.name,
            value: ingredient.id,
          }))
        : [],
    },
    {
      label: 'Badge',
      type: 'select',
      class: `col-md-6 col-12`,
      name: 'badge',
      options: data?.badges?.length
        ? data.badges.map((badge) => ({
            show: badge.name,
            value: badge.id,
          }))
        : [],
    },
    {
      type: 'ckeditor',
      name: 'who_to_use',
      label: 'Who to use',
      class: 'col-12',
    },
    {
      type: 'ckeditor',
      name: 'how_to_use',
      label: 'How to use',
      class: 'col-12',
    },
    {
      title: 'Display',
      type: 'radio',
      name: 'display',
      class: 'col-md-2 col-sm-6 col-12',
      item: [
        { id: true, description: 'Yes' },
        { id: false, description: 'No' },
      ],
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
