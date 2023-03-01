import FullScreenDialog from '@/components/FullScreenDialog'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import inputData from '@/components/inputs'
import { Button } from '@mui/material'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.function

  const formikValidation = Yup.object({
    name: Yup.string().required('Required!'),
    colour: Yup.string().required('Required!'),
  })

  console.count('manage')

  const formikInitialValues = {
    id: 0,
    name: '',
    colour: '#000',
  }

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: formikValidation,
    onSubmit: (values) => {
      console.log(values)
      setTimeout(() => {
        toggleFullScreenDialog(false)
      }, 2000)
    },
  })

  const badgeValues = [
    {
      label: 'Name',
      placeholder: 'Enter name',
      class: 'col-12 col-sm-6',
      type: 'text',
      name: 'name',
    },
    {
      type: 'color',
      name: 'colour',
      label: 'Badge color',
      class: 'col-12 col-sm-6',
    },
    {
      type: 'editor',
      name: 'answer',
      label: 'Answer',
      class: 'col-12',
    },
    {
      type: 'date',
      name: 'date',
      label: 'Date',
      class: 'col-12 col-sm-4',
      min: '2018-01-01',
      max: '2018-12-31',
    },
    {
      type: 'datetime',
      name: 'datetime',
      label: 'DateTime',
      class: 'col-12 col-sm-4',
      min: '2018-06-07T00:00',
      max: '2018-06-14T00:00',
    },
  ]

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
        >
          <div className='addUserModal'>
            <div className='fspBody'>
              <form onSubmit={formik.handleSubmit} autoComplete='nofill'>
                <>
                  <div className='row'>{inputData(formik, badgeValues)}</div>

                  <div className='flex justify-center align-center mt-10'>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => toggleFullScreenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      sx={{ marginLeft: '1rem' }}
                    >
                      Submit
                    </Button>
                  </div>
                </>
              </form>
            </div>
          </div>
        </FullScreenDialog>
      )}
    </div>
  )
}

export default DashboardManage
