import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../Assets/images/header-logo.jpg'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth, firestore } from '../../config/firebase';
import { AuthContext } from '../../Pages/Context/AuthContext';
import { useCartContext } from '../../Pages/Context/CartContext';
import { collection, getDocs } from 'firebase/firestore';

export default function Header() {
    const { cart } = useCartContext();
    const navigate = useNavigate()
    const { dispatch, isAuthenticated, user } = useContext(AuthContext)
    const [isScrolled, setIsScrolled] = useState(false);
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetchDocm()

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])
    const fetchDocm = async () => {
        let Categories = []
        const querySnapshot = await getDocs(collection(firestore, "Category"));
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            Categories.push(data)
        });
        setCategories(Categories)
    };
    const handleScroll = () => {
        if (window.scrollY > 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };
    const handelLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "LOGOUT" })
                toast.danger("Logout dangerfully", { position: "bottom-left" })
                navigate("/")
            })
            .catch(() => {
                alert(" Something Went Wrong Please Try Again")
            })
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary py-2">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={Logo} alt="" style={{ width: "140px" }} />
                    </Link>
                    <div className="d-flex flex-wrap pt-2">
                        {!isAuthenticated ?
                            <div className='d-flex algin-items-center'>
                                <div>
                                    <div className="btn-group">
                                        <Link className="btn btn-danger me-4 px-3 shadow-none text-capitalize text-white dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            Profile
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link to={'auth/login'} className="dropdown-item" >Login</Link></li>
                                            <li><Link to={'auth/register'} className="dropdown-item" >Register</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="text-center align-item-center">
                                <div className="btn-group">
                                    <Link className="btn btn-danger me-4 px-3 shadow-none text-capitalize text-white dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Profile
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link
                                            className="dropdown-item"
                                            onClick={handelLogout}>
                                            Logout
                                        </Link></li>
                                        <li><Link to={'/userprofile'}
                                            className="dropdown-item">
                                            My Profile
                                        </Link></li>
                                        <li>
                                            {user.role === "admin"
                                                ?
                                                <>
                                                    <Link to={'/dashbord/home'}
                                                        className="dropdown-item">
                                                        Dashboard
                                                    </Link>
                                                </>
                                                :
                                                <>

                                                </>
                                            }
                                        </li>
                                    </ul>
                                </div>

                            </div>

                        }
                        <div className="div">
                            <Link to='/cart' className='text-decoration-none text-white position-relative p-3'>
                                <i className="fa-solid fa-bag-shopping fa-lg"></i><span className=''>Cart</span>

                            </Link>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                                {cart.length}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container-fluid bg-white border-bottom px-3 py-2 text-black">
                <div className="container">
                    <div className="row">
                        <div className="col text-category">
                            <div className="d-flex justify-content-between flex-warp">
                                <div className="d-flex">
                                    {categories.map((element, index) => {
                                        if (index < 5) {
                                            return (
                                                <Link to={`/category/${element.category}`} key={index} className='mb-0 me-3 text-decoration-none  text-capitalize'>
                                                    <p className='mb-0 nav-link'>{element.category}</p>
                                                </Link>
                                            )
                                        }
                                    })}
                                </div>
                                <Link to={'/shop'} className='text-decoration-none'>See All</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
