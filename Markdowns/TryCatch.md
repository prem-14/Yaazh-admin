In try catch, if we have nested try catches, and if an error happens in a child scope, it only get caught in child catch and not in parent catch.

In order to get the error in parent catch, we need to throw the error to the parent scope use `throw` keyword.

**Only child caught the error**

```js
const sample = () => {
  try {
    try {
      const a = ''
      a.dnhjdk()
    } catch (e) {
      console.log('child', e)
    }
  } catch (e) {
    console.log('parent', e)
  }
}

sample()
```

output:

```js
//child TypeError: a.dnhjdk is not a function
```

**Prent and child both caught the error**

```js
const sample = () => {
  try {
    try {
      const a = ''
      a.dnhjdk()
    } catch (e) {
      console.log('child', e)
      throw e
    }
  } catch (e) {
    console.log('parent', e)
  }
}

sample()
```

output:

```js
// child TypeError: a.dnhjdk is not a function
// parent TypeError: a.dnhjdk is not a function
```
