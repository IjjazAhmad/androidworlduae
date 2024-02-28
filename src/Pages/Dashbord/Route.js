import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import AddProcuct from './AddProduct'
import Users from './Users'
import Order from './Order'

export default function Index() {
  return (
    <Routes>
      <Route path='/home'  element={<Home/>} />
      <Route path='/add'  element={<AddProcuct/>} />
      <Route path='/user'  element={<Users/>} />
      <Route path='/order'  element={<Order/>} />
    </Routes>
  )
}
