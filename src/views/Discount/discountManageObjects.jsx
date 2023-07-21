import { formatDateTime, validDateCheck } from '@/common/commonFunctions'
import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    name: '',
    start_date: formatDateTime(new Date()),
    end_date: formatDateTime(new Date()),
    products: [],
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    name: Yup.string().required('Required'),
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
    // .when('start_date', () =>
    //   Yup.string()
    //     .nullable()
    //     .test(
    //       'greaterThan',
    //       'Discount end date must be greater than or equal to discount start date',
    //       function (end_date) {
    //         const start_date = this.parent.start_date
    //         console.log(
    //           start_date,
    //           end_date,
    //           validDateCheck(end_date),
    //           validDateCheck(start_date),
    //           new Date(end_date) >= new Date(start_date)
    //         )
    //         if (validDateCheck(end_date) && validDateCheck(start_date)) {
    //           return new Date(end_date) >= new Date(start_date)
    //         }
    //         return true
    //       }
    //     )
    // ),
    products: Yup.array(),
  })
  return formValidation
}

const formInputsFunc = (data, formik) => {
  const formInput = [
    {
      label: 'Discount name',
      placeholder: 'Enter name',
      type: 'text',
      class: 'col-md-6 col-sm-6 col-12',
      name: 'name',
    },
    {
      label: 'Discount start date',
      placeholder: 'Enter start date',
      type: 'datetime',
      class: 'col-md-6 col-sm-6 col-12',
      name: 'start_date',
      touchedError: false,
    },
    {
      label: 'Discount end date',
      placeholder: 'Enter end date',
      type: 'datetime',
      class: 'col-md-6 col-sm-6 col-12',
      name: 'end_date',
      min: formik.values.start_date,
      touchedError: false,
    },
    {
      label: 'Products',
      type: 'multiselect',
      class: `col-md-6 col-12`,
      name: 'products',
      options: data?.products?.length
        ? data.products.map((product) => ({
            show: product.name,
            value: product.id,
          }))
        : [],
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
