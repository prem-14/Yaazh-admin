import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { useAddProductMutation, useUpdateProductMutation, useGetProductQuery } from '@/store/apis/productApis'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './productManageObjects'
import { fillFormikField, formatDateTime } from '@/common/commonFunctions'
import { useSelector } from 'react-redux'
import { useDeleteImagesMutation } from '@/store/apis/commonApis'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog
  const { nestedCategories, badges, faqs, ingredients } = useSelector((state) => state.global)

  const [addProduct, addProductResults] = useAddProductMutation()
  const [updateProduct, updateProductResults] = useUpdateProductMutation()
  const [deleteImages, _] = useDeleteImagesMutation()
  const {
    data: productData,
    error,
    isFetching,
  } = useGetProductQuery(
    { id: data.data.product_id },
    {
      skip: data.status === 'new' ? true : false,
      refetchOnMountOrArgChange: true,
    }
  )

  const formikValidation = formValidationFunc()
  const formikInitialValues = formikInitialValuesFunc(data)

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: true,
    validationSchema: formikValidation,
    onSubmit: (values) => {
      values.discount_startdate = new Date(values.discount_startdate).toISOString()
      values.discount_enddate = new Date(values.discount_enddate).toISOString()
      data.status === 'new' ? addProduct(values) : updateProduct(values)
    },
  })

  const formInputs = formInputsFunc({ ...data, nestedCategories, badges, faqs, ingredients }, formik)

  useEffect(() => {
    if (productData?.records?.length) {
      fillFormikField(formik, productData.records[0], ['discount_startdate', 'discount_enddate'])
      formik.setFieldValue('discount_enddate', formatDateTime(new Date(productData.records[0].discount_enddate)))
      formik.setFieldValue('discount_startdate', formatDateTime(new Date(productData.records[0].discount_startdate)))
    }
  }, [productData])

  useEffect(() => {
    if (addProductResults.isSuccess || updateProductResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('productAction')
    }
  }, [addProductResults, updateProductResults])

  console.log(formik)

  const handleClose = () => {
    toggleFullScreenDialog(false)
    if (data.status === 'new') {
      const imagesToDelete = [...formik.values.images, ...formik.values.deletedImages]
      imagesToDelete.length && deleteImages({ images: imagesToDelete })
    }
  }

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={handleClose}
          loading={addProductResults.isLoading || updateProductResults.isLoading}
        >
          {isFetching ? (
            <CircularProgress />
          ) : (
            <div>
              <form onSubmit={formik.handleSubmit} autoComplete='nofill'>
                <>
                  <div className='row'>{inputData(formik, formInputs)}</div>

                  <div className='flex justify-center align-center mt-20'>
                    <Button variant='contained' color='secondary' onClick={handleClose}>
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
