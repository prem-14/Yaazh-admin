import React, { Fragment } from 'react'
import './index.css'
import Box from '@mui/material/Box'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid'
import { IconButton, Tooltip } from '@mui/material'
import { styled } from '@mui/system'
import CustomColumns from './CustomColumns'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PaidIcon from '@mui/icons-material/Paid'

const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  fontSize: 'unset',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.background.variation,
  },
  '& .MuiTablePagination-toolbar': {
    fontSize: '1.3rem',
  },
  '& .MuiTablePagination-displayedRows': {
    fontSize: 'unset',
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
}))

const CustomGridToolbarContainer = styled(GridToolbarContainer)(
  ({ theme }) => ({
    fontSize: '1.3rem',
    '& .MuiButtonBase-root': {
      fontSize: 'unset',
    },
  })
)

export default function DataGridDemo(props) {
  const formik = props.formik
  const [selected, setSelected] = React.useState([])
  const tableActions = props.tableActions
  const tableValues = props.tableValues
  const tableData = props.tableData

  const handleOnCellClick = (params) => {
    console.log(params)
  }

  const handleRowSelect = (ids) => {
    setSelected(ids)
  }

  const handlePageSizeChange = (newPageSize) => {
    formik.setFieldValue('limit', newPageSize)
    formik.setFieldValue('page', 1)
    // dispatch(changeTableFunction(formik))
  }

  const handlePageChange = (newPage) => {
    formik.setFieldValue('page', newPage + 1)
    // dispatch(changeTableFunction(formik))
  }

  function CustomToolbar() {
    return (
      <CustomGridToolbarContainer>
        {selected.length > 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: '0 10px',
              width: '100%',
            }}
          >
            <div>{selected.length} rows selected</div>
            <div>
              {tableActions.map((data, indexhead) => {
                return (
                  <Fragment key={data.label}>
                    <Tooltip
                      title={
                        <div style={{ fontSize: '1.2rem' }}>{data.label}</div>
                      }
                    >
                      <IconButton
                        onClick={() => {
                          data.onclick(selected, data.type)
                        }}
                        aria-label={data.label}
                      >
                        {data.icon}
                      </IconButton>
                    </Tooltip>
                  </Fragment>
                )
              })}
            </div>
          </Box>
        ) : (
          <Box sx={{ p: '0 10px' }}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            {/* <GridToolbarExport /> */}
          </Box>
        )}
      </CustomGridToolbarContainer>
    )
  }

  return (
    <Box sx={{ height: 600, width: '100%', marginTop: '1rem' }}>
      <Box
        sx={{
          // maxHeight: 700,
          width: '100%',
          height: '100%',
          '& .MuiDataGrid-selectedRowCount': {
            visibility: 'visible !important',
            width: 'unset',
            height: 'unset',
          },
        }}
      >
        <CustomDataGrid
          disableVirtualization
          rows={tableData}
          columns={CustomColumns(tableValues)}
          // columns={columns}
          autoHeight={tableData.length > 5 ? false : true}
          checkboxSelection
          components={{
            Toolbar: CustomToolbar,
          }}
          disableSelectionOnClick={true}
          hideFooterSelectedRowCount={true}
          // loading={true}
          onSelectionModelChange={handleRowSelect}
          onCellClick={handleOnCellClick}
          pagination
          rowsPerPageOptions={
            [5, 20, 40, 60].includes(formik.values.limit)
              ? [5, 20, 40, 60]
              : [formik.values.limit, 5, 20, 40, 60]
          }
          pageSize={formik.values.limit}
          onPageSizeChange={handlePageSizeChange}
          page={formik.values.page - 1}
          onPageChange={handlePageChange}
          // getRowHeight={() => '100'}
        />
      </Box>
    </Box>
  )
}
