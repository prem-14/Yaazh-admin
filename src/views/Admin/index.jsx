import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import DataTable from '@/components/DataTable'
import CustomDialog from '@/components/CustomDialog'
import AdminManage from './AdminManage'
import { Button } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import CustomSearch from '@/components/CustomSearch'
import { useFetchAdminsMutation, useChangeAdminStatusMutation } from '@/store/apis/adminApis'
import { formikInitialValuesFunc, searchFormFunc, tableActionsFunc, tableColumnsFunc } from './indexObjects'
import { useParams } from 'react-router-dom'

const Admin = (props) => {
  const [fetchAdmins, results] = useFetchAdminsMutation()
  const [changeStatus, statusResults] = useChangeAdminStatusMutation()

  const [actionStatus, setActionStatus] = useState(false)
  const [manage, setManage] = useState({
    popup: false,
    status: 'new',
    id: 0,
  })
  let { action } = useParams()

  const toggleFullScreenDialog = (popup = false, status = 'new', data = {}) => {
    setManage({ popup, status, data, action })
  }

  const fromComponent = (from) => {
    if (from === 'adminAction') {
      fetchAdmins(formik.values)
    }
  }

  const onClickSingle = (row, actionType) => {
    toggleFullScreenDialog(true, 'edit', row)
  }

  const formikInitialValues = formikInitialValuesFunc()

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: false,
    onSubmit: (values) => {
      fetchAdmins(values)
    },
  })

  useEffect(() => {
    fetchAdmins(formik.values)
  }, [])

  const formikSelection = useFormik({
    initialValues: {
      status: 'active',
      id: [],
    },
    onSubmit: (values) => {
      changeStatus(values)
        .unwrap()
        .then(() => {
          setActionStatus(false)
          fetchAdmins(formik.values)
        })
        .catch(() => setActionStatus(false))
    },
  })

  const onSelectMultiProducts = (data, action) => {
    setActionStatus(true)
    formikSelection.setFieldValue('id', data)
    formikSelection.setFieldValue('status', action)
  }

  const tableColumns = tableColumnsFunc(onClickSingle)
  const searchInfo = searchFormFunc()
  const tableActions = tableActionsFunc(onSelectMultiProducts)

  return (
    <Layout>
      <CustomSearch searchInfo={searchInfo} formik={formik} />

      <Button variant='outlined' onClick={() => toggleFullScreenDialog(true, 'new', 0)}>
        <AddBoxOutlinedIcon /> <span className='ml-5'> Add New Admin </span>
      </Button>

      <DataTable
        formik={formik}
        tableActions={tableActions}
        tableColumns={tableColumns}
        tableData={results?.data?.data?.responseData?.records || []}
        totalRecords={results?.data?.data?.responseData?.totalRecords || 0}
        uniqueId={'admin_id'}
        paginationChange={fetchAdmins}
        isLoading={results.isLoading}
        isSuccess={results.isSuccess}
      />

      {manage.popup && (
        <AdminManage data={manage} toggleFullScreenDialog={toggleFullScreenDialog} fromComponent={fromComponent} />
      )}

      <CustomDialog open={actionStatus} handleClose={() => setActionStatus(false)} title='Change admin status'>
        <p>
          Are you sure you want to change the status to{' '}
          {formikSelection.values?.status === 'active' ? 'active' : 'inactive'} ?
        </p>
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

export default Admin
