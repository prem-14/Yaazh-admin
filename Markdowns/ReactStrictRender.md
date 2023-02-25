In Development, When it strict mode (React.StrictMode), the componet will render twice even it is an empty dependency array.
In Production, the strict mode is automatically removed by react.

```js
useEffect(() => {
  console.log('effect ran') // will run two times
}, [])
```

Normally it is good for most things ( ex. catch bugs... ). But some scenarios we need to find a solution for the double render.
Example: if we do a fetch request, it will call the same api twice due to double render.

Solution:

```js
import { useEffect, useRef } from 'react'

function App() {
  const effectRan = useRef(false)

  useEffect(() => {
    console.log('effect ran')

    // Variation #1 (it will get fetched only on the first render)
    /* if (effectRan.current === false) {
      const fetchUsers = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const json = await response.json()
        console.log(json)
      }
      fetchUsers()
      return () => {
        console.log('unmounted')
        effectRan.current = true
      }
    } */

    // Variation #2 (it will get fetched only on the second render (or) if it is a production environment)
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const fetchUsers = async () => {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )
        const json = await response.json()
        console.log(json)
      }

      fetchUsers()
    }
    return () => {
      console.log('unmounted')
      effectRan.current = true
    }
  }, [])

  return <p></p>
}

export default App
```
