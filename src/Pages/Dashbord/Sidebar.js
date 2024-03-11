import React from 'react'
import Route from './Route'
import { Link } from 'react-router-dom'
import logo from '../../Assets/images/sidebar-logo.jpg'
import { useFilterProductContext } from '../Context/Filterproduct'
export default function Sidebar() {

    const { updatefiltervalue } = useFilterProductContext();

    return (
        <div className="mainsidebar">
            <header>
                <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header bg-dark">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body bg-dark">

                        <div className="list-group list-group-flush mx-3 mt-4 ">
                            <Link
                                to="/dashbord/home"
                                className="list-group-item list-group-item-action py-2 ripple bg-dark"
                            >
                                <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Dashboard</span>
                            </Link>
                            <Link to="/dashbord/add" className="list-group-item list-group-item-action ripple py-2 bg-dark">
                                <i className="fas fa-chart-area fa-fw me-3"></i><span>Add Product</span>
                            </Link>
                            <Link to="/dashbord/order" className="list-group-item list-group-item-action py-2 ripple bg-dark"
                            ><i className="fas fa-chart-bar fa-fw me-3"></i><span>Orders</span></Link>
                            <Link to="/dashbord/user" className="list-group-item list-group-item-action py-2 ripple bg-dark"
                            ><i className="fas fa-users fa-fw me-3"></i><span>Users</span></Link>
                            <Link to="/" className="list-group-item list-group-item-action py-2 ripple bg-dark"
                            ><i className="fas fa-arrow-left fa-fw me-3"></i><span>Leave</span></Link>
                        </div>
                    </div>
                </div>
                <nav id="sidebarMenu"
                    tabIndex="-1"
                    className="collapse d-lg-block sidebar bg-dark collapse ">
                    <div className="position-sticky bg-dark">
                        <div className="list-group list-group-flush mx-3 mt-4 ">
                            <Link
                                to="/dashbord/home"
                                className="list-group-item list-group-item-action py-2 ripple bg-dark"
                            >
                                <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Dashboard</span>
                            </Link>
                            <Link to="/dashbord/add" className="list-group-item list-group-item-action ripple py-2 bg-dark">
                                <i className="fas fa-chart-area fa-fw me-3"></i><span>Add Product</span>
                            </Link>
                            <Link to="/dashbord/order" className="list-group-item list-group-item-action py-2 ripple bg-dark"
                            ><i className="fas fa-chart-bar fa-fw me-3"></i><span>Orders</span></Link>
                            <Link to="/dashbord/user" className="list-group-item list-group-item-action py-2 ripple bg-dark"
                            ><i className="fas fa-users fa-fw me-3"></i><span>Users</span></Link>
                            <Link to="/" className="list-group-item list-group-item-action py-2 ripple bg-dark"
                            ><i className="fas fa-arrow-left fa-fw me-3"></i><span>Leave</span></Link>
                        </div>
                    </div>
                </nav>
                <nav id="main-navbar" className="navbar navbar-expand-lg border-bottom navbar-light bg-white fixed-top">
                    <div className="container-fluid">
                        <button className="btn btn-primary navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                            <i className="fas fa-bars"></i>
                        </button>
                        <Link className="navbar-brand" to="/">
                            <img
                                src={logo}
                                className='w-100'
                                alt="MDB Logo" />
                        </Link>
                        <form className="d-none d-md-flex input-group w-auto my-auto" onSubmit={(e) => { e.preventDefault() }}>
                            <input
                                type="search"
                                onChange={updatefiltervalue} name='sidetext'
                                className="form-control rounded"
                                placeholder='Search'
                                style={{ minWidth: "225px" }}
                            />
                        </form>
                    </div>
                </nav>
            </header>
            <main style={{ marginTop: "58px" }}>

                <div className="container pt-4">
                    <Route />
                </div>
            </main>
        </div>
    )
}
