import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import DataTable from '@/components/DataTable'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CustomDialog from '@/components/CustomDialog'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PaidIcon from '@mui/icons-material/Paid'
import DummyManage from './DummyManage'
import { Button } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import CustomSearch from '@/components/CustomSearch'
import { getAllCustomers, changeCustomerStatus } from '@/store/thunk/dummy'
import { useSelector } from 'react-redux'
import { useThunk } from '@/hooks/useThunk'

const Dummy = () => {
  const [actionStatus, setActionStatus] = useState(false)
  const [fetchAllCustomers, isLoadingCustomers, isErrorProducts] = useThunk(getAllCustomers)
  const [changeStatus, isLoadingStatus] = useThunk(changeCustomerStatus)
  const { allCustomers } = useSelector((state) => state.dummy)
  const dummyType = useSelector((state) => state.dummy.type)

  const [manage, setManage] = useState({
    popup: false,
    status: 'new',
    id: 0,
  })

  const toggleFullScreenPopup = (popup = false, status = 'new', data = {}, from) => {
    if (from === 'customerAction') {
      fetchAllCustomers(formik.values)
    }
    setManage({ popup, status, data })
  }

  const onClickSingle = (row, actionType) => {
    toggleFullScreenPopup(true, 'edit', row)
  }

  const onClickMultiple = (row, actionType) => {
    console.log('onClickMultiple', row, actionType)
    // toggleFullScreenPopup(true, 'edit', id)
  }

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

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: false,
    onSubmit: (values) => {
      fetchAllCustomers(values)
    },
  })

  useEffect(() => {
    const promise = fetchAllCustomers(formik.values)

    return () => {
      promise.abort()
    }
  }, [])

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
      field: 'customers_updated_on',
      type: 'date',
      headerName: 'Updated On',
      width: 200,
    },
    {
      field: 'customers_status',
      type: 'string',
      headerName: 'Status',
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

  console.log(formik.values)

  const formikSelection = useFormik({
    initialValues: {
      status: '',
      id: [],
    },
    onSubmit: (values) => {
      console.log('formikSelection', values)
      changeStatus(values)
    },
  })

  const onSelectMultiProducts = (data, action) => {
    setActionStatus(true)
    formikSelection.setFieldValue('id', data)
    formikSelection.setFieldValue('status', action)
  }

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

  useEffect(() => {
    console.log('dummy', dummyType)
    if (dummyType === changeCustomerStatus.fulfilled().type) {
      setActionStatus(false)
      fetchAllCustomers(formik.values)
    }
  }, [dummyType])

  return (
    <Layout>
      <CustomSearch searchInfo={searchInfo} formik={formik} />

      <Button variant='outlined' onClick={() => toggleFullScreenPopup(true, 'new', 0)}>
        <AddBoxOutlinedIcon /> <span className='ml-5'> Add New Badge </span>
      </Button>

      <DataTable
        formik={formik}
        tableActions={tableActions}
        tableColumns={tableColumns}
        tableData={allCustomers.records || []}
        totalRecords={allCustomers.totalRecords || 0}
        uniqueId={'customers_id'}
        paginationChange={getAllCustomers}
        isLoading={isLoadingCustomers}
        // isSuccess={} // TODO: need to handle
      />

      {manage.popup && <DummyManage data={manage} function={toggleFullScreenPopup} />}

      <CustomDialog open={actionStatus} handleClose={() => setActionStatus(false)} title='Change badge status'>
        <p>Are you sure you want to change the status?</p>
        <div className='flex justify-end mt-10'>
          <Button
            variant='contained'
            color='secondary'
            disabled={isLoadingStatus}
            onClick={() => setActionStatus(false)}
          >
            Cancel
          </Button>
          <form onSubmit={formikSelection.handleSubmit} autoComplete='nofill'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={isLoadingStatus}
              sx={{ marginLeft: '0.5rem' }}
            >
              {isLoadingStatus ? <CircularProgress color='inherit' size='2rem' /> : 'Confirm'}
            </Button>
          </form>
        </div>
      </CustomDialog>
    </Layout>
  )
}

export default Dummy
