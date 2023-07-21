import EditIcon from '@mui/icons-material/Edit'

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

const tableColumnsFunc = (onClickSingle) => {
  const tableColumns = [
    {
      field: 'badge_name',
      type: 'string',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'badge_colour',
      type: 'colour',
      headerName: 'Colour',
      width: 200,
    },
    {
      field: 'badge_created_on',
      type: 'dateTime',
      headerName: 'Updated On',
      width: 200,
    },
    {
      field: 'badge_updated_on',
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
      flex: 1,
    },
  ]

  return tableColumns
}

const searchFormFunc = () => {
  const searchInfo = [
    {
      label: 'Name',
      placeholder: 'Enter Badge name',
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

export { tableColumnsFunc, formikInitialValuesFunc, searchFormFunc }
