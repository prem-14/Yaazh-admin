import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/views/Login'
import Template from '@/views/Template'
import DummyThunk from '@/views/DummyThunk'
import DummyRTKQ from '@/views/DummyRTKQ'
import Dashboard from '@/views/Dashboard'
import PrivateRoute from './privateRoute'
import Category from '@/views/Category'
import Badge from '@/views/Badge'
import Faq from '@/views/Faq'
import Ingredient from '@/views/Ingredient'
import Product from '@/views/Product'
import Discount from '@/views/Discount'
import Admin from '@/views/Admin'
import Coupon from '@/views/Coupon'
import Banner from '@/views/Banner'
import StaticPage from '@/views/StaticPage'
import GeneralSetting from '@/views/GeneralSetting'
import Blog from '@/views/Blog'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<Dashboard />} />
        {/* <Route path='*' element={<DummyThunk />} />  */}
        {/* <Route path='*' element={<DummyRTKQ />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path='/admins' element={<Admin />} />
          <Route path='/categories' element={<Category />} />
          <Route path='/products' element={<Product />} />
          <Route path='/templates/:action' element={<Template />} />
          <Route path='/badges' element={<Badge />} />
          <Route path='/faqs' element={<Faq />} />
          <Route path='/ingredients' element={<Ingredient />} />
          <Route path='/discounts' element={<Discount />} />
          <Route path='/coupons' element={<Coupon />} />
          <Route path='/settings/banners' element={<Banner />} />
          <Route path='/settings/static_pages' element={<StaticPage />} />
          <Route path='/settings/general_settings' element={<GeneralSetting />} />
          <Route path='/blogs' element={<Blog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
