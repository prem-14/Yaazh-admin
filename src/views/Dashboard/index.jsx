import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import DataTable from '@/components/DataTable'
import { products } from '@/assets/sampledata/data'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CustomDialog from '@/components/CustomDialog'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PaidIcon from '@mui/icons-material/Paid'
import DashboardManage from './DashboardManage'
import { Button } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import CustomSearch from '@/components/CustomSearch'

const Dashboard = () => {
  const [actionStatus, setActionStatus] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const [manage, setManage] = useState({
    popup: false,
    status: 'new',
    id: 0,
  })

  const toggleFullScreenPopup = (popup, status, id, data = {}) => {
    if (popup) {
      setManage({ popup, status, id, data })
    } else {
      setManage({ popup, status: 'new', id: 0 })
    }
  }

  console.count()

  //   const debouncedValidate = useMemo(
  //     () => debounce(formik.validateForm, 500),
  //     [formik.validateForm],
  // );

  // useEffect(() => {
  //     console.log('calling deboucedValidate');
  //     debouncedValidate(formik.values);
  // }, [formik.values]);

  const onClickSingle = (row, actionType) => {
    toggleFullScreenPopup(true, 'edit', row.id, row)
  }

  const onClickMultiple = (row, actionType) => {
    console.log('onClickMultiple', row, actionType)
    // toggleFullScreenPopup(true, 'edit', id)
  }

  const formikInitialValues = {
    page: 1,
    limit: 20,
    order: 'asc',
    sort: '',
    filters: {
      name: {
        value: '',
        type: 'like',
        field: 'name',
      },
    },
  }

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: false,
    onSubmit: (values) => {
      // setIsLoading(true)
      console.log(values)
    },
  })

  const tableValues = [
    {
      field: 'images',
      type: 'imagewithurl',
      firstChild: true,
      headerName: 'Image',
    },
    {
      field: 'name',
      type: 'string',
      headerName: 'Name',
      width: 200,
      flex: 1,
    },
    {
      field: 'actions1',
      type: 'action',
      clickType: 'edit',
      onclick: onClickSingle,
      headerName: 'Single Action',
      tooltipTitle: 'Edit',
      icon: <EditIcon color='secondary' />,
    },
    {
      field: 'actions2',
      type: 'action',
      isMultiple: true,
      headerName: 'Multiple Action',
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

  const searchInfo = [
    {
      label: 'Product name',
      placeholder: 'Enter product name',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'name',
    },
    {
      label: 'Product name',
      placeholder: 'Enter product name',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'name',
    },
    {
      label: 'Product name',
      placeholder: 'Enter product name',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'name',
    },
    {
      label: 'Product name',
      placeholder: 'Enter product name',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'name',
    },
  ]

  const formikSelection = useFormik({
    initialValues: {
      action: '',
      id: '',
    },
    onSubmit: (values) => {
      console.log('formikSelection', values)
      setActionLoading(true)
      setTimeout(() => {
        setActionStatus(false)
        setActionLoading(false)
      }, 2000)
      // dispatch(changeBadgeStatus(values))
    },
  })

  const onSelectMultiProducts = (data, action) => {
    console.log(data, action)
    formikSelection.setFieldValue('id', data)
    formikSelection.setFieldValue('action', action)
    setActionStatus(true)
  }

  const tableActions = [
    {
      label: 'Move to not display',
      icon: <BlockIcon color='secondary' />,
      onclick: onSelectMultiProducts,
      type: 'deactivate',
    },
    {
      label: 'Move to display',
      icon: <CheckCircleIcon color='secondary' />,
      onclick: onSelectMultiProducts,
      type: 'activate',
    },
  ]

  return (
    <Layout>
      <CustomSearch searchInfo={searchInfo} formik={formik} />

      <Button
        variant='outlined'
        onClick={() => toggleFullScreenPopup(true, 'new', 0)}
      >
        <AddBoxOutlinedIcon /> <span className='ml-5'> Add New Badge </span>
      </Button>
      <DataTable
        formik={formik}
        tableActions={tableActions}
        tableValues={tableValues}
        tableData={products}
      />
      {manage.popup && (
        <DashboardManage data={manage} function={toggleFullScreenPopup} />
      )}
      <CustomDialog
        open={actionStatus}
        handleClose={() => setActionStatus(false)}
        title='Change badge status'
      >
        <p>Are you sure you want to change the status?</p>
        <div className='flex justify-end mt-10'>
          <Button
            variant='contained'
            color='secondary'
            disabled={actionLoading}
            onClick={() => setActionStatus(false)}
          >
            Cancel
          </Button>
          <form onSubmit={formikSelection.handleSubmit} autoComplete='nofill'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={actionLoading}
              sx={{ marginLeft: '0.5rem' }}
            >
              {actionLoading ? (
                <CircularProgress color='inherit' size='2rem' />
              ) : (
                'Confirm'
              )}
            </Button>
          </form>
        </div>
      </CustomDialog>
    </Layout>
  )
}

export default Dashboard
