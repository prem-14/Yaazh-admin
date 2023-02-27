import { IconButton, Tooltip } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'

export default function CustomColumns(tableValues) {
  const columns = tableValues.map((data, i) => {
    if (data.type === 'imagewithurl') {
      return {
        ...data,
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <img
              className={`tableimage`}
              src={`${row[data.field][0].url}`}
              alt={row.title}
              // loading="lazy"
              onError={(e) => (e.target.src = '/assets/images/noImg.png')}
            />
          )
        },
      }
    } else if (data.type === 'action') {
      return {
        ...data,
        renderCell: (obj) => {
          return (
            <>
              {data.isMultiple ? (
                <>
                  {data.multiple.map((dt) => {
                    return (
                      <Tooltip title={dt.tooltipTitle}>
                        <IconButton
                          onClick={() => dt.onclick(obj.row, dt.clickType)}
                        >
                          {dt.icon}
                        </IconButton>
                      </Tooltip>
                    )
                  })}
                </>
              ) : (
                <>
                  <Tooltip title={data.tooltipTitle}>
                    <IconButton
                      onClick={() => data.onclick(obj.row, data.clickType)}
                    >
                      {data.icon}
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </>
          )
        },
      }
    } else {
      return { ...data }
    }
  })

  return columns
}
