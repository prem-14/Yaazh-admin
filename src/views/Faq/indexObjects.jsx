import EditIcon from '@mui/icons-material/Edit'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const formikInitialValuesFunc = (action) => {
  const formikInitialValues = {
    page: 1,
    limit: 20,
    orderby: ['id asc'],
    filters: {
      question: {
        value: '',
        type: 'like',
        field: 'question',
      },
    },
  }
  return formikInitialValues
}

const tableColumnsFunc = (onClickSingle, onClickMultiple) => {
  const tableColumns = [
    {
      field: 'faq_question',
      type: 'string',
      headerName: 'Question',
      flex: 1,
    },
    {
      field: 'faq_category',
      type: 'string',
      headerName: 'Category',
      width: 100,
    },
    {
      field: 'faq_active',
      type: 'boolean',
      headerName: 'Active',
    },
    {
      field: 'faq_created_on',
      type: 'dateTime',
      headerName: 'Updated On',
      width: 200,
    },
    {
      field: 'faq_updated_on',
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
      label: 'Question',
      placeholder: 'Enter faq question',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'question',
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
