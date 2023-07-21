import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { useAddCategoryMutation, useUpdateCategoryMutation, useGetCategoryQuery } from '@/store/apis/categoryApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './CategoryManageObjects'
import { fillFormikField } from '@/common/commonFunctions'
import { useSelector } from 'react-redux'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog
  const nestedCategories = useSelector((state) => state.global.nestedCategories)
  console.log('nestedCategories', nestedCategories)
  const [addCategory, addCategoryResults] = useAddCategoryMutation()
  const [updateCategory, updateCategoryResults] = useUpdateCategoryMutation()
  const {
    data: categoryData,
    error,
    isFetching,
  } = useGetCategoryQuery(
    { id: data.data.category_id },
    {
      skip: data.status === 'new' ? true : false,
      refetchOnMountOrArgChange: true,
    }
  )

  const formikValidation = formValidationFunc()
  const formikInitialValues = formikInitialValuesFunc(data)
  const formInputs = formInputsFunc({ nestedCategories })

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: true,
    validationSchema: formikValidation,
    onSubmit: (values) => {
      console.log(values)
      data.status === 'new' ? addCategory(values) : updateCategory(values)
    },
  })
  console.log('formik', formik)
  useEffect(() => {
    if (categoryData?.records?.length) {
      fillFormikField(formik, categoryData.records[0])
    }
  }, [categoryData])

  useEffect(() => {
    if (addCategoryResults.isSuccess || updateCategoryResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('categoryAction')
    }
  }, [addCategoryResults, updateCategoryResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addCategoryResults.isLoading || updateCategoryResults.isLoading}
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
