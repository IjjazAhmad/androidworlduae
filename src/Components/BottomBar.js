import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomBar() {
    return (
            <div className="bottom-bar">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <Link to='/' className='text-decoration-none text-danger'><i className="fa fa-house"></i></Link>
                        </div>
                        <div className="col-4"><Link to='/shop' className='text-decoration-none text-danger'><i className="fa fa-shop"></i></Link></div>
                        <div className="col-4"><Link to='/cart' className='text-decoration-none text-danger'><i className="fa fa-cart-shopping"></i></Link></div>
                    </div>
                </div>
            </div>
    )
}
