import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { useAddBlogMutation, useUpdateBlogMutation, useGetBlogQuery } from '@/store/apis/blogApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './BlogManageObjects'
import { fillFormikField } from '@/common/commonFunctions'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog

  const [addBlog, addBlogResults] = useAddBlogMutation()
  const [updateBlog, updateBlogResults] = useUpdateBlogMutation()
  const {
    data: blogData,
    error,
    isFetching,
  } = useGetBlogQuery(
    { id: data.data.blog_id },
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
      data.status === 'new' ? addBlog(values) : updateBlog(values)
    },
  })

  useEffect(() => {
    if (blogData?.records?.length) {
      fillFormikField(formik, blogData.records[0])
    }
  }, [blogData])

  console.log('formik', formik)

  useEffect(() => {
    if (addBlogResults.isSuccess || updateBlogResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('blogAction')
    }
  }, [addBlogResults, updateBlogResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addBlogResults.isLoading || updateBlogResults.isLoading}
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
