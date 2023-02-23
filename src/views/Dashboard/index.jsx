import Layout from '@/components/Layout'
import SampleButton from '@/components/SampleButton'
import React from 'react'

const Dashboard = ({ mode, setMode }) => {
  return (
    <Layout>
      <SampleButton mode={mode} setMode={setMode} />
    </Layout>
  )
}

export default Dashboard
