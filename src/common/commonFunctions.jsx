export const fillFormikField = (formik, data) => {
  Object.keys(formik.values).forEach((key) => {
    if (data.hasOwnProperty(key)) {
      formik.setFieldValue(key, data[key])
    }
  })
}
