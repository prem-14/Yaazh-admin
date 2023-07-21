import EditIcon from '@mui/icons-material/Edit'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const formikInitialValuesFunc = (action) => {
  const formikInitialValues = {
    page: 1,
    limit: 20,
    orderby: ['id asc'],
    filters: {
      name: {
        value: '',
        type: 'like',
        field: 'first_name',
      },
      email: {
        value: '',
        type: 'like',
        field: 'email',
      },
    },
  }
  return formikInitialValues
}

const tableColumnsFunc = (onClickSingle, onClickMultiple) => {
  const tableColumns = [
    {
      field: 'admin_first_name',
      type: 'string',
      headerName: 'First Name',
      width: 200,
    },
    {
      field: 'admin_email',
      type: 'string',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'admin_status',
      type: 'string',
      headerName: 'Status',
    },
    {
      field: 'admin_lastlogin',
      type: 'dateTime',
      headerName: 'Last login',
      width: 200,
    },
    {
      field: 'admin_created_on',
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
      placeholder: 'Enter first name',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'name',
      filter: true,
      onBlurEvent: true,
      onChangeEvent: false,
    },
    {
      label: 'Email Address',
      placeholder: 'Enter email',
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
      label: 'Move to inactive',
      icon: <BlockIcon color='secondary' />,
      onclick: onSelectMultiProducts,
      type: 'inactive',
    },
    {
      label: 'Move to active',
      icon: <CheckCircleIcon color='secondary' />,
      onclick: onSelectMultiProducts,
      type: 'active',
    },
  ]
  return tableActions
}

export { tableColumnsFunc, formikInitialValuesFunc, searchFormFunc, tableActionsFunc }
