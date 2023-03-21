import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { addCustomer, updateCustomer, getCustomer } from '@/store/thunk/dummy'
import { useThunk } from '@/hooks/useThunk'
import { useDispatch, useSelector } from 'react-redux'
import { clearCustomer } from '@/store/slice/dummy'

const DashboardManage = (props) => {
  const data = props.data
  const ref = useRef(true)
  const toggleFullScreenDialog = props.function
  const dispatch = useDispatch()

  const [customerAction, isCustomerLoading] = useThunk(data.status === 'new' ? addCustomer : updateCustomer)
  const [fetchCustomer, isGettingCustomer] = useThunk(getCustomer)
  const dummyType = useSelector((state) => state.dummy.type)
  const singleCustomer = useSelector((state) => state.dummy.singleCustomer)

  // useEffect(() => {
  if (data.status === 'edit' && ref.current) {
    fetchCustomer({ id: data.data.customers_id })
  }
  ref.current = false
  // }, [])

  const formikValidation = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid email format').required('Required!'),
    phone: Yup.string().required('Required!'),
    address: Yup.string().required('Required!'),
  })

  const formikInitialValues = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
  }

  const formik = useFormik({
    initialValues: formikInitialValues,
    // validateOnBlur: true,
    validateOnChange: true,
    // validateOnMount: true,
    validationSchema: formikValidation,
    onSubmit: (values) => {
      console.log(values)
      customerAction(values)
    },
  })

  console.log(formik)

  useEffect(() => {
    if (singleCustomer?.records[0]) {
      formik.setFieldValue('id', singleCustomer.records[0].id)
      formik.setFieldValue('name', singleCustomer.records[0].name)
      formik.setFieldValue('email', singleCustomer.records[0].email)
      formik.setFieldValue('phone', singleCustomer.records[0].phone)
      formik.setFieldValue('address', singleCustomer.records[0].address)
    }
  }, [singleCustomer])

  useEffect(() => {
    if (dummyType === addCustomer.fulfilled().type || dummyType === updateCustomer.fulfilled().type) {
      toggleFullScreenDialog(false, undefined, undefined, 'customerAction')
    }

    return () => {
      dispatch(clearCustomer())
    }
  }, [dummyType])

  const badgeValues = [
    {
      label: 'Name',
      placeholder: 'Enter name',
      class: 'col-12 col-sm-6',
      type: 'text',
      name: 'name',
    },
    {
      label: 'Email',
      placeholder: 'Enter email address',
      class: 'col-12 col-sm-6',
      type: 'text',
      name: 'email',
    },
    {
      label: 'Phone Number',
      placeholder: 'Enter phone number',
      class: 'col-12 col-sm-6',
      type: 'text',
      name: 'phone',
    },
    {
      label: 'Address',
      placeholder: 'Enter  address',
      class: 'col-12 col-sm-6',
      type: 'text',
      name: 'address',
    },
  ]

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={isCustomerLoading}
        >
          {isGettingCustomer ? (
            <CircularProgress />
          ) : (
            <div>
              <form onSubmit={formik.handleSubmit} autoComplete='nofill'>
                <>
                  <div className='row'>{inputData(formik, badgeValues)}</div>

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
