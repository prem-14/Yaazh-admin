Important - https://www.youtube.com/playlist?list=PLM0LBHjz37LW_Wz3DPoT5-bm1btrBD1bu

The thunk payloadCreator function will be called with two arguments: args and thunkApi
https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator

There are 3 cancellation ways in redux thunk:

####Canceling Thunk Before Execution

- https://redux-toolkit.js.org/api/createAsyncThunk#canceling-before-execution
- https://www.youtube.com/watch?v=ur2zry8WoV0&list=PLM0LBHjz37LW_Wz3DPoT5-bm1btrBD1bu&index=9&ab_channel=Rowadz

####Canceling Thunk While Running

- https://redux-toolkit.js.org/api/createAsyncThunk#canceling-while-running
- https://www.youtube.com/watch?v=GY8ysZ-fNko&list=PLM0LBHjz37LW_Wz3DPoT5-bm1btrBD1bu&index=10&ab_channel=Rowadz

####Canceling HTTP requests and thunks while running

- https://www.youtube.com/watch?v=Zwhzd5DPhGk&list=PLM0LBHjz37LW_Wz3DPoT5-bm1btrBD1bu&index=11&ab_channel=Rowadz

```js
const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (_, { dispatch, signal }) => {
    try {
      const controller = new AbortController()
      signal.addEventListener('abort', () => {
        controller.abort()
      })
      const response = await axiosAdmin.get('/products', {
        ...generateConfig(),
        signal: controller.signal,
      })
      apiStatusResponse(dispatch, response)
      return response.data
    } catch (e) {
      commonErrorResponse(dispatch, e)
      // throw e
    }
  }
)
```
