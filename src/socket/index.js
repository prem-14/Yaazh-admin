import { io } from 'socket.io-client'
import store from '@/store'
import { setNestedCategories } from '@/store/slice/global'
import { discountsApi } from '@/store/apis/discountApis'

const socket = io(`${import.meta.env.VITE_BACKEND_URL}/admin`, { autoConnect: true, transports: ['websocket'] })

socket.on('connect', () => {
  console.log(`You connected with id ${socket.id}`)
})

socket.on('nestedCategories', (data) => {
  store.dispatch(setNestedCategories(data))
  // Manual cache general update
  const patchCollection = store.dispatch(
    discountsApi.util.updateQueryData('getDiscount', { id: 1 }, (result) => {
      console.log(JSON.stringify(result))
      return {
        ...result,
        records: [
          {
            id: 1,
            start_date: '2023-04-02T07:37:00.000Z',
            end_date: '2023-04-02T08:37:00.000Z',
            products: [2],
            created_on: '2023-04-02T06:37:48.854Z',
            updated_on: '2023-04-09T13:30:36.494Z',
            name: 'discount dgdhghd',
          },
        ],
      }
    })
  )
  console.log('patchCollection', patchCollection)
})

socket.on('welcome', (data) => {
  console.log(data)
})

console.count('socket')
