import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PaidIcon from '@mui/icons-material/Paid'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    page: 1,
    limit: 20,
    orderby: ['c.id asc'],
    filters: {
      name: {
        value: '',
        type: 'like',
        field: 'c.name',
      },
      email: {
        value: '',
        type: 'like',
        field: 'c.email',
      },
    },
  }
  return formikInitialValues
}

const tableColumnsFunc = (onClickSingle, onClickMultiple) => {
  const tableColumns = [
    {
      field: 'customers_id',
      type: 'number',
      headerName: 'ID',
    },
    {
      field: 'customers_email',
      type: 'string',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'customers_name',
      type: 'string',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'customers_address',
      type: 'string',
      headerName: 'Address',
      width: 200,
    },
    {
      field: 'customers_phone',
      type: 'string',
      headerName: 'Phone',
      width: 200,
    },
    {
      field: 'customers_status',
      type: 'string',
      headerName: 'Status',
      width: 200,
    },
    {
      field: 'customers_updated_on',
      type: 'date',
      headerName: 'Updated On',
      width: 200,
    },
    {
      field: 'actions1',
      type: 'action',
      clickType: 'edit',
      onclick: onClickSingle,
      headerName: 'Single Action',
      tooltipTitle: 'Edit',
      icon: <EditIcon color='secondary' />,
      MaxWidth: 200,
    },
    {
      field: 'actions2',
      type: 'action',
      isMultiple: true,
      headerName: 'Multiple Action',
      MaxWidth: 200,
      multiple: [
        {
          buttonType: 'visibility',
          clickType: 'offerDocs',
          onclick: onClickMultiple,
          tooltipTitle: 'Delete',
          icon: <DeleteIcon color='secondary' />,
        },
        {
          buttonType: 'visibility',
          clickType: 'offerDocuSign',
          onclick: onClickMultiple,
          tooltipTitle: 'Pay',
          icon: <PaidIcon color='secondary' />,
        },
      ],
    },
  ]

  return tableColumns
}

const searchFormFunc = () => {
  const searchInfo = [
    {
      label: 'Customer name',
      placeholder: 'Enter Customer name',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'name',
      filter: true,
      onBlurEvent: true,
      onChangeEvent: false,
    },
    {
      label: 'Customer email',
      placeholder: 'Enter Customer email address',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'email',
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
      type: 'inactive',
    },
    {
      label: 'Move to display',
      icon: <CheckCircleIcon color='secondary' />,
      onclick: onSelectMultiProducts,
      type: 'active',
    },
  ]
  return tableActions
}

export { tableColumnsFunc, formikInitialValuesFunc, searchFormFunc, tableActionsFunc }
