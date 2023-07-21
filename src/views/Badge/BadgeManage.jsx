import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { useAddBadgeMutation, useUpdateBadgeMutation, useGetBadgeQuery } from '@/store/apis/badgeApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './badgeManageObjects'
import { fillFormikField } from '@/common/commonFunctions'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog

  const [addBadge, addBadgeResults] = useAddBadgeMutation()
  const [updateBadge, updateBadgeResults] = useUpdateBadgeMutation()
  const {
    data: badgeData,
    error,
    isFetching,
  } = useGetBadgeQuery(
    { id: data.data.badge_id },
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
      data.status === 'new' ? addBadge(values) : updateBadge(values)
    },
  })

  useEffect(() => {
    if (badgeData?.records?.length) {
      fillFormikField(formik, badgeData.records[0])
    }
  }, [badgeData])

  useEffect(() => {
    if (addBadgeResults.isSuccess || updateBadgeResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('badgeAction')
    }
  }, [addBadgeResults, updateBadgeResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addBadgeResults.isLoading || updateBadgeResults.isLoading}
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
