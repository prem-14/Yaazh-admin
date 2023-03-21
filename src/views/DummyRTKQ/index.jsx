import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import DataTable from '@/components/DataTable'
import CustomDialog from '@/components/CustomDialog'
import DummyManage from './DummyManage'
import { Button } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import CustomSearch from '@/components/CustomSearch'
import { useFetchCustomersMutation, useChangeCustomerStatusMutation } from '@/store/apis/dummyApis'
import { formikInitialValuesFunc, searchFormFunc, tableActionsFunc, tableColumnsFunc } from './indexObjects'

const Dummy = () => {
  const [fetchCustomers, results] = useFetchCustomersMutation()
  const [changeStatus, statusResults] = useChangeCustomerStatusMutation()

  const [actionStatus, setActionStatus] = useState(false)
  const [manage, setManage] = useState({
    popup: false,
    status: 'new',
    id: 0,
  })

  const toggleFullScreenDialog = (popup = false, status = 'new', data = {}) => {
    setManage({ popup, status, data })
  }

  const fromComponent = (from) => {
    if (from === 'customerAction') {
      fetchCustomers(formik.values)
    }
  }

  const onClickSingle = (row, actionType) => {
    toggleFullScreenDialog(true, 'edit', row)
  }

  const onClickMultiple = (row, actionType) => {
    console.log('onClickMultiple', row, actionType)
    // toggleFullScreenDialog(true, 'edit', id)
  }

  const formikInitialValues = formikInitialValuesFunc()

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: false,
    onSubmit: (values) => {
      fetchCustomers(values)
    },
  })

  useEffect(() => {
    fetchCustomers(formik.values)
  }, [])

  const formikSelection = useFormik({
    initialValues: {
      status: '',
      id: [],
    },
    onSubmit: (values) => {
      changeStatus(values)
        .unwrap()
        .then(() => {
          setActionStatus(false)
          fetchCustomers(formik.values)
        })
        .catch(() => setActionStatus(false)) // I could have used finally() for setActionStatus(false), but it would have called after fetchCustomers and because of that there will be a slight UI bug. That why used then and catch.
    },
  })

  const onSelectMultiProducts = (data, action) => {
    setActionStatus(true)
    formikSelection.setFieldValue('id', data)
    formikSelection.setFieldValue('status', action)
  }

  const tableColumns = tableColumnsFunc(onClickSingle, onClickMultiple)
  const searchInfo = searchFormFunc()
  const tableActions = tableActionsFunc(onSelectMultiProducts)

  return (
    <Layout>
      <CustomSearch searchInfo={searchInfo} formik={formik} />

      <Button variant='outlined' onClick={() => toggleFullScreenDialog(true, 'new', 0)}>
        <AddBoxOutlinedIcon /> <span className='ml-5'> Add New Badge </span>
      </Button>

      <DataTable
        formik={formik}
        tableActions={tableActions}
        tableColumns={tableColumns}
        tableData={results?.data?.data?.responseData?.records || []}
        totalRecords={results?.data?.data?.responseData?.totalRecords || 0}
        uniqueId={'customers_id'}
        paginationChange={fetchCustomers}
        isLoading={results.isLoading}
        isSuccess={results.isSuccess}
      />

      {manage.popup && (
        <DummyManage data={manage} toggleFullScreenDialog={toggleFullScreenDialog} fromComponent={fromComponent} />
      )}

      <CustomDialog open={actionStatus} handleClose={() => setActionStatus(false)} title='Change badge status'>
        <p>Are you sure you want to change the status?</p>
        <div className='flex justify-end mt-10'>
          <Button
            variant='contained'
            color='secondary'
            disabled={statusResults.isLoading}
            onClick={() => setActionStatus(false)}
          >
            Cancel
          </Button>
          <form onSubmit={formikSelection.handleSubmit} autoComplete='nofill'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={statusResults.isLoading}
              sx={{ marginLeft: '0.5rem' }}
            >
              {statusResults.isLoading ? <CircularProgress color='inherit' size='2rem' /> : 'Confirm'}
            </Button>
          </form>
        </div>
      </CustomDialog>
    </Layout>
  )
}

export default Dummy
