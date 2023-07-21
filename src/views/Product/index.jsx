import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import DataTable from '@/components/DataTable'
import CustomDialog from '@/components/CustomDialog'
import ProductManage from './ProductManage'
// import { results } from '@/assets/sampledata/data'
import { Button, Typography } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import CustomSearch from '@/components/CustomSearch'
import {
  useFetchProductsMutation,
  useChangeProductStatusMutation,
  useChangeProductDiscountMutation,
} from '@/store/apis/productApis'
import {
  discountInitialValuesFunc,
  discountInputsFunc,
  discountValidationFunc,
  formikInitialValuesFunc,
  searchFormFunc,
  tableActionsFunc,
  tableColumnsFunc,
} from './indexObjects'
import { formatDateTime } from '@/common/commonFunctions'
import inputData from '@/components/inputs'

const Product = (props) => {
  const [fetchProducts, results] = useFetchProductsMutation()
  const [changeStatus, statusResults] = useChangeProductStatusMutation()
  const [changeProductDiscount, changeProductDiscountResults] = useChangeProductDiscountMutation()

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
    if (from === 'productAction') {
      fetchProducts(formik.values)
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
      fetchProducts(values)
    },
  })

  useEffect(() => {
    fetchProducts(formik.values)
  }, [])

  const discountFormikValidation = discountValidationFunc()
  const discountFormikInitialValues = discountInitialValuesFunc()

  const discountFormik = useFormik({
    initialValues: discountFormikInitialValues,
    validateOnChange: true,
    validationSchema: discountFormikValidation,
    onSubmit: (values) => {},
  })

  const { DiscountStartInput, DiscountEndInput, DiscountInput } = discountInputsFunc(discountFormik)

  const handleDiscountChange = (payload) => {
    changeProductDiscount(payload)
      .unwrap()
      .then(() => {
        fetchProducts(formik.values)
      })
      .catch(() => setActionStatus(false))
  }

  const formikSelection = useFormik({
    initialValues: {
      actionValue: '',
      display: true,
      id: [],
    },
    onSubmit: (values) => {
      changeStatus(values)
        .unwrap()
        .then(() => {
          setActionStatus(false)
          fetchProducts(formik.values)
        })
        .catch(() => setActionStatus(false))
    },
  })

  const onSelectMultiProducts = (data, action) => {
    if (action === 'discount_config') {
      formikSelection.setFieldValue('actionValue', 'discount_config')
    } else {
      formikSelection.setFieldValue('actionValue', 'display_status')
      formikSelection.setFieldValue('display', action)
    }
    setActionStatus(true)
    formikSelection.setFieldValue('id', data)
  }

  const tableColumns = tableColumnsFunc(onClickSingle)
  const searchInfo = searchFormFunc()
  const tableActions = tableActionsFunc(onSelectMultiProducts)

  return (
    <Layout>
      <CustomSearch searchInfo={searchInfo} formik={formik} />

      <Button variant='outlined' onClick={() => toggleFullScreenDialog(true, 'new', 0)}>
        <AddBoxOutlinedIcon /> <span className='ml-5'> Add New Product </span>
      </Button>
      <DataTable
        formik={formik}
        tableActions={tableActions}
        tableColumns={tableColumns}
        tableData={results?.data?.data?.responseData?.records || []}
        totalRecords={results?.data?.data?.responseData?.totalRecords || 0}
        uniqueId={'product_id'}
        paginationChange={fetchProducts}
        isLoading={results.isLoading}
        isSuccess={results.isSuccess}
      />

      {manage.popup && (
        <ProductManage data={manage} toggleFullScreenDialog={toggleFullScreenDialog} fromComponent={fromComponent} />
      )}

      <CustomDialog
        open={formikSelection.values.actionValue === 'display_status' && actionStatus}
        handleClose={() => setActionStatus(false)}
        title='Change product status'
      >
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

      <CustomDialog
        open={formikSelection.values.actionValue === 'discount_config' && actionStatus}
        width='700'
        handleClose={() => setActionStatus(false)}
        title='Change Discount dates'
      >
        <div className='mt-20'>
          <Typography>Discount start date</Typography>
          <div className='mt-10'>{inputData(discountFormik, DiscountStartInput)}</div>
          <Button
            variant='contained'
            sx={{ display: 'block', marginLeft: 'auto', marginTop: '10px' }}
            onClick={() =>
              handleDiscountChange({
                id: formikSelection.values.id,
                discountConfig: 'discount_startdate',
                discount_startdate: new Date(discountFormik.values.discount_startdate).toISOString(),
              })
            }
          >
            Change
          </Button>
        </div>

        <div className='mt-20'>
          <Typography>Discount end date</Typography>
          <div className='mt-10'>{inputData(discountFormik, DiscountEndInput)}</div>
          <Button
            variant='contained'
            sx={{ display: 'block', marginLeft: 'auto', marginTop: '10px' }}
            onClick={() =>
              handleDiscountChange({
                id: formikSelection.values.id,
                discountConfig: 'discount_enddate',
                discount_enddate: new Date(discountFormik.values.discount_enddate).toISOString(),
              })
            }
          >
            Change
          </Button>
        </div>

        <div className='mt-20'>
          <Typography>Discount</Typography>
          <div className='row mt-10'>{inputData(discountFormik, DiscountInput)}</div>
          <Button
            variant='contained'
            sx={{ display: 'block', marginLeft: 'auto', marginTop: '10px' }}
            onClick={() =>
              handleDiscountChange({
                id: formikSelection.values.id,
                discountConfig: 'discount',
                discount_option: discountFormik.values.discount_option,
                discount: discountFormik.values.discount,
              })
            }
          >
            Change
          </Button>
        </div>
      </CustomDialog>
    </Layout>
  )
}

export default Product
