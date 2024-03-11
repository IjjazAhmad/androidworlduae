import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ForgetPassword from './ForgetPassword'

export default function index() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
        </Routes>
    )
}
