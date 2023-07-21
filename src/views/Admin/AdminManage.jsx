import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { useAddAdminMutation, useUpdateAdminMutation, useGetAdminQuery } from '@/store/apis/adminApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './adminManageObjects'
import { fillFormikField } from '@/common/commonFunctions'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog

  const [addAdmin, addAdminResults] = useAddAdminMutation()
  const [updateAdmin, updateAdminResults] = useUpdateAdminMutation()
  const {
    data: adminData,
    error,
    isFetching,
  } = useGetAdminQuery(
    { id: data.data.admin_id },
    {
      skip: data.status === 'new' ? true : false,
      refetchOnMountOrArgChange: true,
    }
  )

  console.log('data', data)

  const formikValidation = formValidationFunc(data)
  const formikInitialValues = formikInitialValuesFunc()
  const { adminFormInputs, adminPermissionInput } = formInputsFunc(data)

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: true,
    validationSchema: formikValidation,
    onSubmit: (values) => {
      data.status === 'new' ? addAdmin(values) : updateAdmin(values)
    },
  })

  useEffect(() => {
    if (adminData?.records?.length) {
      fillFormikField(formik, adminData.records[0])
    }
  }, [adminData])

  console.log('formik', formik)

  useEffect(() => {
    if (addAdminResults.isSuccess || updateAdminResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('adminAction')
    }
  }, [addAdminResults, updateAdminResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addAdminResults.isLoading || updateAdminResults.isLoading}
        >
          {isFetching ? (
            <CircularProgress />
          ) : (
            <div>
              <form onSubmit={formik.handleSubmit} autoComplete='nofill'>
                <>
                  <div className='row'>{inputData(formik, adminFormInputs)}</div>
                  <div className='mt-20'>
                    <h4 className='dashTitle'>PERMISSIONS</h4>
                    {inputData(formik, adminPermissionInput)}
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
