import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { useAddCouponMutation, useUpdateCouponMutation, useGetCouponQuery } from '@/store/apis/couponApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './CouponManageObjects'
import { fillFormikField, formatDateTime } from '@/common/commonFunctions'
import { useSelector } from 'react-redux'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog

  const nestedCategories = useSelector((state) => state.global.nestedCategories)
  const allCategories = useSelector((state) => state.global.allCategories)

  const [addCoupon, addCouponResults] = useAddCouponMutation()
  const [updateCoupon, updateCouponResults] = useUpdateCouponMutation()
  const {
    data: couponData,
    error,
    isFetching,
  } = useGetCouponQuery(
    { id: data.data.coupon_id },
    {
      skip: data.status === 'new' ? true : false,
      refetchOnMountOrArgChange: true,
    }
  )

  const formikValidation = formValidationFunc()
  const formikInitialValues = formikInitialValuesFunc(data)

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: true,
    validateOnMount: false,
    validationSchema: formikValidation,
    onSubmit: (values) => {
      values.start_date = new Date(values.start_date).toISOString()
      values.end_date = new Date(values.end_date).toISOString()
      console.log(values)
      data.status === 'new' ? addCoupon(values) : updateCoupon(values)
    },
  })

  const formInputs = formInputsFunc({ ...data, nestedCategories, allCategories }, formik)

  useEffect(() => {
    if (couponData?.records?.length) {
      fillFormikField(formik, couponData.records[0], ['end_date', 'start_date'])
      // formik.setValues({
      //   end_date: formatDateTime(new Date(couponData.records[0].end_date)),
      //   start_date: formatDateTime(new Date(couponData.records[0].start_date)),
      // })
      formik.setFieldValue('end_date', formatDateTime(new Date(couponData.records[0].end_date)))
      formik.setFieldValue('start_date', formatDateTime(new Date(couponData.records[0].start_date)))
    }
  }, [couponData])

  console.log('formik', formik)

  useEffect(() => {
    if (addCouponResults.isSuccess || updateCouponResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('couponAction')
    }
  }, [addCouponResults, updateCouponResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addCouponResults.isLoading || updateCouponResults.isLoading}
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
