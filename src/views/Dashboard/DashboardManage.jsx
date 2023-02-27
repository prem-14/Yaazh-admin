import FullScreenDialog from '@/components/FullScreenDialog'
import React from 'react'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.function
  return (
    <div>
      {data.popup ? (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
        />
      ) : null}
    </div>
  )
}

export default DashboardManage
