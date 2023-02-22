## MUI notes

### Apply styles

**There are 3 possible ways to generate and apply styles in MUI**

https://mui.com/system/styles/basics/#styled-components-api

The ampersand (&) can be used to refer back to the main component.

---

### Apply themes

https://mui.com/material-ui/customization/default-theme/

---

### Setting html font-size

```js
html { font-size: 62.5%; }
body { font-size: 1.5rem; }
```

The CSS code "font-size: 62.5%;" when applied to the HTML element sets the base font size of the document to 62.5% of the default font size of the browser. The default font size of most browsers is 16 pixels, so setting the font-size to 62.5% results in a base font size of 10 pixels **(since 62.5% of 16 pixels is 10 pixels)**.

This is often used as a technique to make it easier to work with font sizes and layout in web development. By setting the base font size to 10 pixels, it becomes simpler to use relative font sizes like em or rem units, as 1em is now equal to 10 pixels, and this makes it easier to calculate font sizes and maintain consistency across the website.

For example, setting font-size: 1.6em; for a paragraph will result in a font size of 16 pixels (1.6 times the base font size of 10 pixels). Similarly, setting font-size: 2.5rem; for a heading will result in a font size of 25 pixels (2.5 times the base font size of 10 pixels).

Overall, this technique is a way to create a consistent and easily maintainable layout across different devices and screen sizes.

**Why we need to use this?**

Setting the base font size using the CSS code "font-size: 62.5%;" has several benefits for web development:

-Consistency: By setting a consistent base font size across the website, it's easier to maintain a consistent visual hierarchy and ensure that all text on the site is easy to read and looks visually appealing.

-Accessibility: Using relative font sizes like em or rem units makes it easier for users to adjust the font size in their browser if they have visual impairments, and still maintain the correct proportions and layout.

-Responsiveness: With the rise of responsive web design, it's important to ensure that the layout of a website adjusts smoothly to different screen sizes and devices. Using relative font sizes in conjunction with a consistent base font size makes it easier to maintain a consistent layout and typography across different devices and screen sizes.

-Easier calculations: By setting a base font size of 10 pixels, it's easier to perform quick mental calculations when determining font sizes, especially when using em or rem units. For example, setting font-size: 1.6em for a paragraph will result in a font size of 16 pixels, which is easy to calculate as 1.6 times the base font size of 10 pixels.

In summary, setting a consistent base font size using the "font-size: 62.5%;" CSS code is a helpful technique for web development that can improve consistency, accessibility, responsiveness, and ease of calculation when working with font sizes and layout.

**Iam using mui in my project. I have specified html { font-size: 62.5%; } in css file. Should i also specify in mui theme?**

If you have specified "font-size: 62.5%;" for the HTML element in your CSS file, then you do not need to specify it again in the MUI theme. This is because the MUI theme inherits the font size from the HTML element, and any changes made to the HTML element will be reflected in the MUI components.

However, it's worth noting that the MUI theme includes its own default font sizes for various elements, such as headings, paragraphs, and buttons. If you want to adjust the font sizes of these MUI components, you can do so in the MUI theme using the typography object. For example:

```js
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '3rem',
    },
    body1: {
      fontSize: '1.6rem',
    },
    // etc.
  },
})
```

---

### <CssBaseline />

CssBaseline is a component in Material-UI that provides a simple base-line stylesheet that helps to normalize and apply some common styles across different browsers.

The main purpose of CssBaseline is to provide a consistent starting point for your application's styles, and to help prevent cross-browser inconsistencies and differences in default styles. CssBaseline sets the default margin and padding to 0 for the body element, and applies a few other basic styles to create a more consistent starting point for the rest of your styles.

CssBaseline should be included at the top of your component tree, typically in your application's top-level component or layout component. It ensures that your components will have a consistent and predictable starting point for their styles, and helps to prevent issues like unexpected padding or margin in different browsers.

Here is an example of how you might use CssBaseline in your application:

```js
import React from 'react'
import { CssBaseline } from '@mui/material'
import MyLayout from './MyLayout'

function App() {
  return (
    <>
      <CssBaseline />
      <MyLayout />
    </>
  )
}

export default App
```
