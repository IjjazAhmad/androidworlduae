import React from 'react'
import { Link } from 'react-router-dom'

export default function TopBar({ title }) {
    return (
        <div className="bg-white py-2">
            <div className="container">
                <Link to='/' className='fw-bold'>
                    HOME
                </Link> <i className="fa fa-chevron-right mx-2"></i> <span className='fw-bold'>{title}</span>
            </div>
        </div>
    )
}
