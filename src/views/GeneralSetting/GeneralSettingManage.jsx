import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import {
  useAddConfigurationMutation,
  useUpdateConfigurationMutation,
  useGetConfigurationQuery,
} from '@/store/apis/configurationApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './generalSettingManageObjects'
import { fillFormikField } from '@/common/commonFunctions'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog

  const [addConfiguration, addConfigurationResults] = useAddConfigurationMutation()
  const [updateConfiguration, updateConfigurationResults] = useUpdateConfigurationMutation()
  const {
    data: configurationData,
    error,
    isFetching,
  } = useGetConfigurationQuery(
    { id: data.data.configuration_id },
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
      data.status === 'new' ? addConfiguration(values) : updateConfiguration(values)
    },
  })

  useEffect(() => {
    if (configurationData?.records?.length) {
      fillFormikField(formik, configurationData.records[0])
    }
  }, [configurationData])

  console.log('formik', formik)

  useEffect(() => {
    if (addConfigurationResults.isSuccess || updateConfigurationResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('configurationAction')
    }
  }, [addConfigurationResults, updateConfigurationResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={
            data.status === 'new'
              ? 'ADD NEW CONFIGURATION '
              : `EDIT CONFIGURATION: ${formik.values.variable || 'loading...'} `
          }
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addConfigurationResults.isLoading || updateConfigurationResults.isLoading}
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
