import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { useAddTemplateMutation, useUpdateTemplateMutation, useGetTemplateQuery } from '@/store/apis/templateApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './TemplateManageObjects'
import { fillFormikField } from '@/common/commonFunctions'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog

  const [addTemplate, addTemplateResults] = useAddTemplateMutation()
  const [updateTemplate, updateTemplateResults] = useUpdateTemplateMutation()
  const {
    data: templateData,
    error,
    isFetching,
  } = useGetTemplateQuery(
    { id: data.data.template_id },
    {
      skip: data.status === 'new' ? true : false,
      refetchOnMountOrArgChange: true,
    }
  )

  const formikValidation = formValidationFunc()
  const formikInitialValues = formikInitialValuesFunc(data)
  const { emailFormInput, smsFormInput } = formInputsFunc(data)

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: true,
    validationSchema: formikValidation,
    onSubmit: (values) => {
      data.status === 'new' ? addTemplate(values) : updateTemplate(values)
    },
  })

  useEffect(() => {
    if (templateData?.records?.length) {
      fillFormikField(formik, templateData.records[0])
      // formik.setFieldValue('id', templateData.records[0].id)
      // formik.setFieldValue('name', templateData.records[0].name)
      // formik.setFieldValue('email', templateData.records[0].email)
      // formik.setFieldValue('phone', templateData.records[0].phone)
      // formik.setFieldValue('address', templateData.records[0].address)
    }
  }, [templateData])

  useEffect(() => {
    if (addTemplateResults.isSuccess || updateTemplateResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('templateAction')
    }
  }, [addTemplateResults, updateTemplateResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addTemplateResults.isLoading || updateTemplateResults.isLoading}
        >
          {isFetching ? (
            <CircularProgress />
          ) : (
            <div>
              <form onSubmit={formik.handleSubmit} autoComplete='nofill'>
                <>
                  <div className='row'>
                    {data.action === 'email' ? inputData(formik, emailFormInput) : inputData(formik, smsFormInput)}
                  </div>

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
