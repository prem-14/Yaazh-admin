import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { useAddCustomerMutation, useUpdateCustomerMutation, useGetCustomerQuery } from '@/store/apis/dummyApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './DummyManageObjects'
import { fillFormikField } from '@/common/commonFunctions'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog

  const [addCustomer, addCustomerResults] = useAddCustomerMutation()
  const [updateCustomer, updateCustomerResults] = useUpdateCustomerMutation()
  const {
    data: customerData,
    error,
    isFetching,
  } = useGetCustomerQuery(
    { id: data.data.customers_id },
    {
      skip: data.status === 'new' ? true : false,
      refetchOnMountOrArgChange: true,
    }
  )

  const formikValidation = formValidationFunc()
  const formikInitialValues = formikInitialValuesFunc()
  const formInputs = formInputsFunc()

  const formik = useFormik({
    initialValues: formikInitialValues,
    // validateOnBlur: true,
    validateOnChange: true,
    // validateOnMount: true,
    validationSchema: formikValidation,
    onSubmit: (values) => {
      console.log(values)
      data.status === 'new' ? addCustomer(values) : updateCustomer(values)
    },
  })

  useEffect(() => {
    if (customerData?.records?.length) {
      fillFormikField(formik, customerData.records[0])
      // formik.setFieldValue('id', customerData.records[0].id)
      // formik.setFieldValue('name', customerData.records[0].name)
      // formik.setFieldValue('email', customerData.records[0].email)
      // formik.setFieldValue('phone', customerData.records[0].phone)
      // formik.setFieldValue('address', customerData.records[0].address)
    }
  }, [customerData])

  useEffect(() => {
    if (addCustomerResults.isSuccess || updateCustomerResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('customerAction')
    }
  }, [addCustomerResults, updateCustomerResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addCustomerResults.isLoading || updateCustomerResults.isLoading}
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
