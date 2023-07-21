import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { useAddFaqMutation, useUpdateFaqMutation, useGetFaqQuery } from '@/store/apis/faqApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './FaqManageObjects'
import { fillFormikField } from '@/common/commonFunctions'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog

  const [addFaq, addFaqResults] = useAddFaqMutation()
  const [updateFaq, updateFaqResults] = useUpdateFaqMutation()
  const {
    data: faqData,
    error,
    isFetching,
  } = useGetFaqQuery(
    { id: data.data.faq_id },
    {
      skip: data.status === 'new' ? true : false,
      refetchOnMountOrArgChange: true,
    }
  )

  const formikValidation = formValidationFunc()
  const formikInitialValues = formikInitialValuesFunc(data)
  const formInputs = formInputsFunc(data)

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: true,
    validationSchema: formikValidation,
    onSubmit: (values) => {
      data.status === 'new' ? addFaq(values) : updateFaq(values)
    },
  })

  useEffect(() => {
    if (faqData?.records?.length) {
      fillFormikField(formik, faqData.records[0])
      // formik.setFieldValue('id', faqData.records[0].id)
      // formik.setFieldValue('name', faqData.records[0].name)
      // formik.setFieldValue('email', faqData.records[0].email)
      // formik.setFieldValue('phone', faqData.records[0].phone)
      // formik.setFieldValue('address', faqData.records[0].address)
    }
  }, [faqData])

  useEffect(() => {
    if (addFaqResults.isSuccess || updateFaqResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('faqAction')
    }
  }, [addFaqResults, updateFaqResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addFaqResults.isLoading || updateFaqResults.isLoading}
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
