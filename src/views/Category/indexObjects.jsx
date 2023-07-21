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
        field: 'name',
      },
    },
  }
  return formikInitialValues
}

const tableColumnsFunc = (onClickSingle, onClickMultiple) => {
  const tableColumns = [
    {
      field: 'category_name',
      type: 'string',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'category_display',
      type: 'boolean',
      headerName: 'Display',
    },
    {
      field: 'category_created_on',
      type: 'dateTime',
      headerName: 'Updated On',
      width: 200,
    },
    {
      field: 'category_updated_on',
      type: 'dateTime',
      headerName: 'Updated On',
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
      placeholder: 'Enter Category name',
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
  ]
  return tableActions
}

export { tableColumnsFunc, formikInitialValuesFunc, searchFormFunc, tableActionsFunc }
