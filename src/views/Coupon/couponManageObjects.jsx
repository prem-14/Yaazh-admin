import { formatDateTime, validDateCheck } from '@/common/commonFunctions'
import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    title: '',
    code: '',
    description: '',
    start_date: formatDateTime(new Date()),
    end_date: formatDateTime(new Date()),
    discount: '0',
    total_price_exceed: '0',
    discount_option: 'discount_percent',
    applicable_option: 'applicable',
    category: [],
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    title: Yup.string().required('Required!'),
    code: Yup.string().required('Required!'),
    description: Yup.string().nullable(),
    start_date: Yup.string()
      .nullable()
      .test('validDate', 'Enter a valid date', function (value) {
        return validDateCheck(value)
      }),
    end_date: Yup.string()
      .nullable()
      .test('validDate', 'Enter a valid date', function (value) {
        return validDateCheck(value)
      })
      .test(
        'endDateAfterStartDate',
        'Discount end date must be greater than or equal to discount start date',
        function (value) {
          const startDate = this.parent.start_date
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
      .positive('Must be positive')
      .when('discount_option', (discount_option, schema) => {
        // console.log('discount_option', discount_option) // discount_option value is in Array
        return discount_option.includes('discount_percent') ? schema.max(100, 'Maximum value is 100') : schema
      }),
    total_price_exceed: Yup.number().typeError('Must be a number').required('Required').positive('Must be positive'),
    applicable_option: Yup.string()
      .oneOf(['applicable', 'not_applicable'], 'Option must be either "applicable" or "not_applicable"')
      .required('Required'),
    category: Yup.array(),
  })
  return formValidation
}

const formInputsFunc = (data, formik) => {
  const formInput = [
    {
      label: 'Title',
      placeholder: 'Enter name',
      class: 'col-md-6 col-sm-6 col-12',
      type: 'text',
      name: 'title',
    },
    {
      label: 'Code',
      placeholder: 'Enter code',
      class: 'col-md-6 col-sm-6 col-12',
      type: 'text',
      name: 'code',
    },
    {
      label: 'Description',
      placeholder: 'Enter description',
      class: 'col-12',
      type: 'text',
      name: 'description',
    },
    {
      label: 'Discount start date',
      placeholder: 'Enter start date',
      type: 'datetime',
      class: 'col-md-6 col-sm-6 col-12',
      name: 'start_date',
      // touchedError: false,
    },
    {
      label: 'Discount end date',
      placeholder: 'Enter end date',
      type: 'datetime',
      class: 'col-md-6 col-sm-6 col-12',
      name: 'end_date',
      min: formik.values.start_date,
      // touchedError: false,
    },
    {
      label: 'Total Price Exceed',
      placeholder: 'Enter total price',
      class: 'col-md-6 col-sm-6 col-12',
      type: 'text',
      name: `total_price_exceed`,
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
      label: 'Select coupon applicable or not applicable category ',
      type: 'select',
      class: `col-md-6 col-sm-6 col-12`,
      name: `applicable_option`,
      options: [
        { show: 'Applicable', value: 'applicable' },
        { show: 'Not Applicable', value: 'not_applicable' },
      ],
    },
    {
      label: `Coupon ${formik.values.applicable_option === 'applicable' ? 'applicable' : 'not applicable'} category`,
      placeholder: `Enter coupon ${
        formik.values.applicable_option === 'applicable' ? 'applicable' : 'not applicable'
      } category`,
      class: 'col-md-6 col-sm-6 col-12',
      type: 'multiselect',
      nested: true,
      selectAllOption: false,
      nestedOptions: data.nestedCategories,
      options: data.allCategories?.length
        ? data.allCategories.map((d) => ({
            show: d.name,
            value: d.id,
          }))
        : [],
      name: `category`,
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
