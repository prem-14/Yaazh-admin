import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { useAddDiscountMutation, useUpdateDiscountMutation, useGetDiscountQuery } from '@/store/apis/discountApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './DiscountManageObjects'
import { fillFormikField, formatDateTime } from '@/common/commonFunctions'
import { useSelector } from 'react-redux'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog
  const products = useSelector((state) => state.global.products)

  const [addDiscount, addDiscountResults] = useAddDiscountMutation()
  const [updateDiscount, updateDiscountResults] = useUpdateDiscountMutation()
  const {
    data: discountData,
    error,
    isFetching,
  } = useGetDiscountQuery(
    { id: data.data.discount_id },
    {
      skip: data.status === 'new' ? true : false,
      refetchOnMountOrArgChange: true, // if not used, it won't send request and  will give the cached value
      // refetchOnReconnect: true, // after network reconnect
      // refetchOnFocus: true, // fetch after it goes and return from other tabs
    }
  )

  console.log(discountData, error, isFetching)

  const formikValidation = formValidationFunc()
  const formikInitialValues = formikInitialValuesFunc(data)

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: true,
    validationSchema: formikValidation,
    onSubmit: (values) => {
      values.start_date = new Date(values.start_date).toISOString()
      values.end_date = new Date(values.end_date).toISOString()
      data.status === 'new' ? addDiscount(values) : updateDiscount(values)
    },
  })

  const formInputs = formInputsFunc({ ...data, products }, formik)

  useEffect(() => {
    if (discountData?.records?.length) {
      fillFormikField(formik, discountData.records[0])
      formik.setFieldValue('end_date', formatDateTime(new Date(discountData.records[0].end_date)))
      formik.setFieldValue('start_date', formatDateTime(new Date(discountData.records[0].start_date)))
    }
  }, [discountData])

  // console.log('formik', formik)

  useEffect(() => {
    if (addDiscountResults.isSuccess || updateDiscountResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('discountAction')
    }
  }, [addDiscountResults, updateDiscountResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addDiscountResults.isLoading || updateDiscountResults.isLoading}
        >
          {isFetching ? (
            <CircularProgress />
          ) : (
            <div>
              <form onSubmit={formik.handleSubmit} autoComplete='nofill'>
                <>
                  <div className='row'>{inputData(formik, formInputs)}</div>

                  <div className='flex justify-center align-center mt-20'>
                    <Button variant='contained' color='secondary' onClick={() => toggleFullScreenDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant='contained' color='primary' type='submit' sx={{ marginLeft: '1rem' }}>
                      Submit
                    </Button>
                  </div>
                </>
              </form>
            </div>
          )}
        </FullScreenDialog>
      )}
    </div>
  )
}

export default DashboardManage
