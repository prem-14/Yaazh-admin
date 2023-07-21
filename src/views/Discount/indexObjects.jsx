import EditIcon from '@mui/icons-material/Edit'

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
      field: 'discount_name',
      type: 'string',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'discount_start_date',
      type: 'dateTime',
      headerName: 'Start date',
      width: 200,
    },
    {
      field: 'discount_end_date',
      type: 'dateTime',
      headerName: 'End date',
      width: 200,
    },
    {
      field: 'discount_created_on',
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
      placeholder: 'Enter discount name',
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
