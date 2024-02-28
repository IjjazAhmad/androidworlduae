import React, { useContext } from 'react'
import Frontend from './Frontend'
import Dashbord from './Dashbord'
import Auth from './Auth'
import BackToTopBtn from "../Components/BackToTopBtn";
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../Components/PrivateRoutes'
import { AuthContext } from './Context/AuthContext'

export default function Index() {
    const { user } = useContext(AuthContext)
    return (
        <>
            <BackToTopBtn />
            <Routes>
                <Route path='/*' element={<Frontend />} />
                {
                    user.role === "admin" ?
                        <Route path='dashbord/*' element={<PrivateRoute Component={Dashbord} />} />
                        : <Route path='*' element={<h1>Page Not Found</h1>} />
                }
                <Route path='/auth/*' element={<Auth />} />
            </Routes>
        </>
    )
}
