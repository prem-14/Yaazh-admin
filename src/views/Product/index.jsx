import React, { useEffect } from 'react'
import Layout from '@/components/Layout'
import SampleButton from '@/components/SampleButton'
import { useThunk } from '@/hooks/useThunk'
import { getAllProducts } from '@/store/thunk/product'
import { useSelector } from 'react-redux'

const Product = ({ mode, setMode }) => {
  const [fetchAllProducts, isLoadingProducts, isErrorProducts] =
    useThunk(getAllProducts)
  const { data } = useSelector((state) => state.product)

  useEffect(() => {
    const promise = fetchAllProducts()

    return () => {
      promise.abort()
    }
  }, [])

  // useEffect(() => {
  //   console.log(
  //     'products',
  //     products,
  //     getAllProducts.fulfilled().type,
  //     productType === getAllProducts.fulfilled().type // product/getAllProducts/fulfilled
  //   )
  // }, [products])

  return (
    <Layout>
      {isLoadingProducts ? (
        'loading....'
      ) : (
        <>
          <SampleButton mode={mode} setMode={setMode} />
          {JSON.stringify(data)}
        </>
      )}
    </Layout>
  )
}

export default Product
