#### Vite Docs

(Vite)[https://vitejs.dev/]

#### Vite Install

```sh
npm create vite@latest app-name -- --template react
npm install
npm run dev
```

- http://localhost:5173/

#### Vite Setup

- need to use .jsx extension
- index.html in the source instead of public
- assets still in public
- instead of index.js, need to use main.jsx
- to spin up dev server - "npm run dev"

- rest the same - imports/exports, deployment, assets, etc...

### Vite config

[How to Setup Path Resolving in Vite](https://plainenglish.io/blog/how-to-set-up-path-resolving-in-vite-ad284e0d9eae)

#####vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

After specifying the path in vite.config, we can import the components like below. But it doesn't provide intellisense.

```js
import SampleButton from '@/components/SampleButton'
import SampleText from '@/components/SampleText'
import SampleInput from '@/components/SampleInput'
```

In order to get the intellisense, we should also specify jsconfig.json
#####jsconfig.json

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
