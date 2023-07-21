import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import DataTable from '@/components/DataTable'
import CustomDialog from '@/components/CustomDialog'
import CategoryManage from './CategoryManage'
import { Button } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import CustomSearch from '@/components/CustomSearch'
import { useFetchCategorysMutation, useChangeCategoryStatusMutation } from '@/store/apis/categoryApis'
import { formikInitialValuesFunc, searchFormFunc, tableActionsFunc, tableColumnsFunc } from './indexObjects'

const Category = (props) => {
  const [fetchCategorys, results] = useFetchCategorysMutation()
  const [changeStatus, statusResults] = useChangeCategoryStatusMutation()

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
    if (from === 'categoryAction') {
      fetchCategorys(formik.values)
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
      fetchCategorys(values)
    },
  })

  useEffect(() => {
    fetchCategorys(formik.values)
  }, [])

  const formikSelection = useFormik({
    initialValues: {
      display: true,
      id: [],
    },
    onSubmit: (values) => {
      changeStatus(values)
        .unwrap()
        .then(() => {
          setActionStatus(false)
          fetchCategorys(formik.values)
        })
        .catch(() => setActionStatus(false))
    },
  })

  const onSelectMultiProducts = (data, action) => {
    setActionStatus(true)
    formikSelection.setFieldValue('id', data)
    formikSelection.setFieldValue('display', action)
  }

  const tableColumns = tableColumnsFunc(onClickSingle)
  const searchInfo = searchFormFunc()
  const tableActions = tableActionsFunc(onSelectMultiProducts)

  return (
    <Layout>
      <CustomSearch searchInfo={searchInfo} formik={formik} />

      <Button variant='outlined' onClick={() => toggleFullScreenDialog(true, 'new', 0)}>
        <AddBoxOutlinedIcon /> <span className='ml-5'> Add New Category </span>
      </Button>

      <DataTable
        formik={formik}
        tableActions={tableActions}
        tableColumns={tableColumns}
        tableData={results?.data?.data?.responseData?.records || []}
        totalRecords={results?.data?.data?.responseData?.totalRecords || 0}
        uniqueId={'category_id'}
        paginationChange={fetchCategorys}
        isLoading={results.isLoading}
        isSuccess={results.isSuccess}
      />

      {manage.popup && (
        <CategoryManage data={manage} toggleFullScreenDialog={toggleFullScreenDialog} fromComponent={fromComponent} />
      )}

      <CustomDialog open={actionStatus} handleClose={() => setActionStatus(false)} title='Change category status'>
        <p>
          Are you sure you want to change the status to {formikSelection.values?.display ? 'display' : 'not display'} ?
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

export default Category
