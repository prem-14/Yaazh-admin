import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import DataTable from '@/components/DataTable'
import BadgeManage from './BadgeManage'
import { Button } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import CustomSearch from '@/components/CustomSearch'
import { useFetchBadgesMutation } from '@/store/apis/badgeApis'
import { formikInitialValuesFunc, searchFormFunc, tableColumnsFunc } from './indexObjects'
import { useParams } from 'react-router-dom'

const Badge = () => {
  const [fetchBadges, results] = useFetchBadgesMutation()

  const [manage, setManage] = useState({
    popup: false,
    status: 'new',
    id: 0,
  })
  let { action } = useParams()

  const toggleFullScreenDialog = (popup = false, status = 'new', data = {}) => {
    setManage({ popup, status, data, action })
  }

  const fromComponent = (from) => {
    if (from === 'badgeAction') {
      fetchBadges(formik.values)
    }
  }

  const onClickSingle = (row, actionType) => {
    toggleFullScreenDialog(true, 'edit', row)
  }

  const formikInitialValues = formikInitialValuesFunc()

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: false,
    onSubmit: (values) => {
      fetchBadges(values)
    },
  })

  useEffect(() => {
    fetchBadges(formik.values)
  }, [])

  const tableColumns = tableColumnsFunc(onClickSingle)
  const searchInfo = searchFormFunc()

  return (
    <Layout>
      <CustomSearch searchInfo={searchInfo} formik={formik} />

      <Button variant='outlined' onClick={() => toggleFullScreenDialog(true, 'new', 0)}>
        <AddBoxOutlinedIcon /> <span className='ml-5'> Add New Badge </span>
      </Button>

      <DataTable
        formik={formik}
        tableActions={[]}
        tableColumns={tableColumns}
        tableData={results?.data?.data?.responseData?.records || []}
        totalRecords={results?.data?.data?.responseData?.totalRecords || 0}
        uniqueId={'badge_id'}
        paginationChange={fetchBadges}
        isLoading={results.isLoading}
        isSuccess={results.isSuccess}
      />

      {manage.popup && (
        <BadgeManage data={manage} toggleFullScreenDialog={toggleFullScreenDialog} fromComponent={fromComponent} />
      )}
    </Layout>
  )
}

export default Badge
