import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import {
  useAddStaticPageMutation,
  useUpdateStaticPageMutation,
  useGetStaticPageQuery,
} from '@/store/apis/staticPageApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './StaticPageManageObjects'
import { fillFormikField } from '@/common/commonFunctions'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog

  const [addStaticPage, addStaticPageResults] = useAddStaticPageMutation()
  const [updateStaticPage, updateStaticPageResults] = useUpdateStaticPageMutation()
  const {
    data: staticPageData,
    error,
    isFetching,
  } = useGetStaticPageQuery(
    { id: data.data.static_page_id },
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
      data.status === 'new' ? addStaticPage(values) : updateStaticPage(values)
    },
  })

  useEffect(() => {
    if (staticPageData?.records?.length) {
      fillFormikField(formik, staticPageData.records[0])
    }
  }, [staticPageData])

  console.log('formik', formik)

  useEffect(() => {
    if (addStaticPageResults.isSuccess || updateStaticPageResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('staticPageAction')
    }
  }, [addStaticPageResults, updateStaticPageResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addStaticPageResults.isLoading || updateStaticPageResults.isLoading}
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
