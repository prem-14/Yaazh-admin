import EditIcon from '@mui/icons-material/Edit'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EventIcon from '@mui/icons-material/Event'
import { formatDateTime, validDateCheck } from '@/common/commonFunctions'
import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    page: 1,
    limit: 20,
    orderby: ['id asc'],
    filters: {
      name: {
        value: '',
        type: 'like',
        field: 'name',
      },
    },
  }
  return formikInitialValues
}

const tableColumnsFunc = (onClickSingle, onClickMultiple) => {
  const tableColumns = [
    {
      field: 'product_images',
      type: 'imagewithurl',
      firstChild: true,
      headerName: 'Image',
    },
    {
      field: 'product_name',
      type: 'string',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'product_size_unit',
      type: 'string',
      headerName: 'Product Size',
      valueGetter: ({ row }) => `${row.product_size} ${row.product_unit}`,
      width: 200,
    },
    {
      field: 'product_retail_price',
      type: 'string',
      headerName: 'Retail Price',
      width: 200,
    },
    {
      field: 'product_display',
      type: 'boolean',
      headerName: 'Display',
    },
    {
      field: 'product_discount_startdate',
      type: 'dateTime',
      headerName: 'Discount Start Date',
      width: 200,
    },
    {
      field: 'product_discount_enddate',
      type: 'dateTime',
      headerName: 'Discount End Date',
      width: 200,
    },
    {
      field: 'product_created_on',
      type: 'dateTime',
      headerName: 'Created On',
      width: 200,
    },
    {
      field: 'action',
      type: 'action',
      clickType: 'edit',
      onclick: onClickSingle,
      headerName: 'Action',
      tooltipTitle: 'Edit',
      icon: <EditIcon color='secondary' />,
      MaxWidth: 200,
    },
  ]

  return tableColumns
}

const searchFormFunc = () => {
  const searchInfo = [
    {
      label: 'Name',
      placeholder: 'Enter product name',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'name',
      filter: true,
      onBlurEvent: true,
      onChangeEvent: false,
    },
  ]
  return searchInfo
}

const tableActionsFunc = (onSelectMultiProducts) => {
  const tableActions = [
    {
      label: 'Move to not display',
      icon: <BlockIcon color='secondary' />,
      onclick: onSelectMultiProducts,
      type: false,
    },
    {
      label: 'Move to display',
      icon: <CheckCircleIcon color='secondary' />,
      onclick: onSelectMultiProducts,
      type: true,
    },
    {
      label: 'Discount config',
      icon: <EventIcon color='secondary' />,
      onclick: onSelectMultiProducts,
      type: 'discount_config',
    },
  ]
  return tableActions
}

const discountInitialValuesFunc = () => {
  const formikInitialValues = {
    discount_startdate: formatDateTime(new Date()),
    discount_enddate: formatDateTime(new Date()),
    discount_option: 'discount_percent',
    discount: 0,
  }
  return formikInitialValues
}

const discountValidationFunc = () => {
  const formValidation = Yup.object({
    discount_startdate: Yup.string()
      .nullable()
      .test('validDate', 'Enter a valid date', function (value) {
        return validDateCheck(value)
      }),
    discount_enddate: Yup.string()
      .nullable()
      .test('validDate', 'Enter a valid date', function (value) {
        return validDateCheck(value)
      }),
    discount_option: Yup.string()
      .oneOf(['discount_percent', 'discount_price'], 'Option must be either "discount_percent" or "discount_price"')
      .required('Required'),
    discount: Yup.number()
      .typeError('Must be a number')
      .required('Required')
      .when('discount_option', (discount_option, schema) => {
        return discount_option.includes('discount_percent') ? schema.max(100, 'Maximum value is 100') : schema
      }),
  })
  return formValidation
}

const discountInputsFunc = (formik) => {
  const DiscountStartInput = [
    {
      label: 'Discount start date',
      placeholder: 'Enter start date',
      type: 'datetime',
      class: 'col-md-6 col-sm-6 col-12',
      name: 'discount_startdate',
      touchedError: false,
    },
  ]

  const DiscountEndInput = [
    {
      label: 'Discount end date',
      placeholder: 'Enter end date',
      type: 'datetime',
      class: 'col-md-6 col-sm-6 col-12',
      name: 'discount_enddate',
      touchedError: false,
    },
  ]

  const DiscountInput = [
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
  ]

  return { DiscountStartInput, DiscountEndInput, DiscountInput }
}

export {
  tableColumnsFunc,
  formikInitialValuesFunc,
  searchFormFunc,
  tableActionsFunc,
  discountInitialValuesFunc,
  discountValidationFunc,
  discountInputsFunc,
}
