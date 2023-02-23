```js
import DarkModeIcon from '@mui/icons-material/DarkMode'
vs
import { DarkMode } from '@mui/icons-material'
```

In terms of performance, there shouldn't be any significant difference between importing a component using the default export or using named exports.

When importing a default export, you're importing a single value. When importing named exports, you're importing an object that contains several values. However, the size of the object is usually small enough that it doesn't have a significant impact on performance.

That being said, if you're importing many components from the same module, it might be more efficient to use a named export instead of a default export because you can import all the components in a single import statement. This can help reduce the number of HTTP requests and improve the overall performance of your application.

---
