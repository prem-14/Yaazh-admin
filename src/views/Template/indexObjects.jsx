import EditIcon from '@mui/icons-material/Edit'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const formikInitialValuesFunc = (action) => {
  const formikInitialValues = {
    page: 1,
    limit: 20,
    orderby: ['id asc'],
    filters: {
      subject: {
        value: '',
        type: 'like',
        field: 'subject',
      },
      title: {
        value: '',
        type: 'like',
        field: 'title',
      },
    },
  }
  return formikInitialValues
}

const tableColumnsFunc = (onClickSingle, onClickMultiple) => {
  const tableColumns = [
    {
      field: 'template_title',
      type: 'string',
      headerName: 'Title',
    },
    {
      field: 'template_subject',
      type: 'string',
      headerName: 'Subject',
      width: 200,
    },
    {
      field: 'template_active',
      type: 'boolean',
      headerName: 'Active',
    },
    {
      field: 'template_created_on',
      type: 'dateTime',
      headerName: 'Updated On',
      width: 200,
    },
    {
      field: 'template_updated_on',
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
      label: 'Title',
      placeholder: 'Enter Template title',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'title',
      filter: true,
      onBlurEvent: true,
      onChangeEvent: false,
    },
    {
      label: 'Subject',
      placeholder: 'Enter Template subject',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'subject',
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
      type: false,
    },
    {
      label: 'Move to active',
      icon: <CheckCircleIcon color='secondary' />,
      onclick: onSelectMultiProducts,
      type: true,
    },
  ]
  return tableActions
}

export { tableColumnsFunc, formikInitialValuesFunc, searchFormFunc, tableActionsFunc }
