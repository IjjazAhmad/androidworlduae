import React from 'react'
import Home from './Home'
import Shop from './Shop'
import Check from './Check'
import UserProfile from './UserProfile'
import SingleProduct from '../../Components/SingleProduct'
import Cart from './Cart'
import { Route, Routes } from 'react-router-dom'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import BottomBar from '../../Components/BottomBar'
import Category from './Category'
export default function index() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/checkout' element={<Check />} />
        <Route path='/singleproduct/:id' element={<SingleProduct />} />
        <Route path='/category/:name' element={<Category />} />
      </Routes>
      <BottomBar />
      <Footer />
    </>
  )
}
