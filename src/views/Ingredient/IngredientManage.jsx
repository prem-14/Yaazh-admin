import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import {
  useAddIngredientMutation,
  useUpdateIngredientMutation,
  useGetIngredientQuery,
} from '@/store/apis/ingredientApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './IngredientManageObjects'
import { fillFormikField } from '@/common/commonFunctions'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog

  const [addIngredient, addIngredientResults] = useAddIngredientMutation()
  const [updateIngredient, updateIngredientResults] = useUpdateIngredientMutation()
  const {
    data: ingredientData,
    error,
    isFetching,
  } = useGetIngredientQuery(
    { id: data.data.ingredient_id },
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
      data.status === 'new' ? addIngredient(values) : updateIngredient(values)
    },
  })

  useEffect(() => {
    if (ingredientData?.records?.length) {
      fillFormikField(formik, ingredientData.records[0])
    }
  }, [ingredientData])

  console.log('formik', formik)

  useEffect(() => {
    if (addIngredientResults.isSuccess || updateIngredientResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('ingredientAction')
    }
  }, [addIngredientResults, updateIngredientResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addIngredientResults.isLoading || updateIngredientResults.isLoading}
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
