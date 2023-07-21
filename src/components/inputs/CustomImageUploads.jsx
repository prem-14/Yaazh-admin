import { useUploadImagesMutation } from '@/store/apis/commonApis'
import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import { CircularProgress, IconButton } from '@mui/material'

const check = (images) => {
  if (Array.isArray(images)) return images
  else if (images && Object.keys(images).length > 0) return [images]
  else return []
}

function CustomUploads(props) {
  const inputFile = useRef()
  const formik = props.formik

  const [dragId, setDragId] = useState(null)
  const [uploadImages, imageResults] = useUploadImagesMutation()

  // const dispatch = useDispatch()
  // const uploadedImages = useSelector((state) => state.common.uploadedImages)
  // const deletedImage = useSelector((state) => state.common.deletedImage)

  useEffect(() => {
    formik.setFieldValue(props.name, check(formik.values[props.name]))
    formik.setFieldValue('deletedImages', [])
  }, [])

  useEffect(() => {
    console.log('imageResults', imageResults)
    if (imageResults.isError) {
      inputFile.current.value = ''
    } else if (imageResults.isSuccess) {
      formik.setFieldValue(props.name, [...formik.values[props.name], ...imageResults?.data?.data?.images])
      inputFile.current.value = ''
    }
  }, [imageResults])

  // useEffect(() => {
  //   formik.setFieldValue(
  //     props.name,
  //     formik.values[props.name].filter((image) => image.public_id != deletedImage.public_id)
  //   )
  // }, [deletedImage])

  const filesSelectedHandler = (e) => {
    let alert = false
    if (e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      files.forEach((file) => {
        if (file.size > 6000000) {
          alert = true
          window.alert(`${file.name} is ${parseInt(file.size / 1000000)}mb size. Max size allowed is 6mb`)
          inputFile.current.value = ''
          return false
        }
      })
      if (!alert) {
        const formData = new FormData()
        files.forEach((file) => {
          formData.append('image', file)
        })
        formData.append('from', props.info.from)
        uploadImages(formData)
      }
    }
  }

  const handleViewImage = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  function handleDeleteImage(id) {
    console.log('handleDeleteImage', id)
    formik.setFieldValue(
      props.name,
      formik.values[props.name].filter((image) => image.public_id != id)
    )
    formik.setFieldValue('deletedImages', [...formik.values[props.name].filter((image) => image.public_id == id)])
  }

  function handleOver(ev) {
    ev.preventDefault()
  }

  function handleDrag(ev) {
    setDragId(ev.currentTarget.id)
  }

  function handleDrop(ev) {
    ev.preventDefault()
    console.log(dragId, ev.currentTarget.id)
    const dragImage = formik.values[props.name].findIndex((image) => image.public_id === dragId)
    const dropImage = formik.values[props.name].findIndex((image) => image.public_id === ev.currentTarget.id)
    const arr = moveItem(dragImage, dropImage)
    formik.setFieldValue(props.name, [...arr])
  }

  function moveItem(from, to) {
    const fromTemp = formik.values[props.name][from]
    const toTemp = formik.values[props.name][to]
    const tempArray = [...formik.values[props.name]]
    console.log(from, to, fromTemp, toTemp, tempArray)
    tempArray[from] = toTemp
    tempArray[to] = fromTemp
    return tempArray
  }

  return (
    <div>
      <label className='imageLabel'>
        {props.label && <h4>{props.label}</h4>}
        {props.labelDesc && <h6>{props.labelDesc}</h6>}
        <input
          type='file'
          id='uploadImage'
          ref={inputFile}
          onChange={filesSelectedHandler}
          accept='image/*'
          multiple={props.multiple}
        />
      </label>
      <div className='flex mt-20'>
        {imageResults.isLoading ? (
          <CircularProgress />
        ) : (
          formik.values[props.name].length > 0 &&
          formik.values[props.name].map((element, index) => {
            return (
              <div
                key={index}
                id={element.public_id}
                className='imageContainer'
                draggable
                onDragOver={(e) => handleOver(e)}
                onDragStart={(e) => handleDrag(e)}
                onDrop={(e) => handleDrop(e)}
              >
                <img src={element.url} alt={`product${index}`} />

                <div className='imageActions'>
                  <IconButton onClick={() => handleViewImage(element.url)}>
                    <VisibilityIcon color='primary' />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteImage(element.public_id)}>
                    <DeleteIcon color='error' />
                  </IconButton>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default CustomUploads
