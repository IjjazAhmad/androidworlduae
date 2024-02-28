import React, { useContext, useState } from 'react'
import TopBar from '../../../Components/TopBar'
import { useCartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { setDoc, doc } from "firebase/firestore";
import { firestore } from '../../../config/firebase';
import { AuthContext } from '../../Context/AuthContext';

const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    countryname: "",
    town: "",
    postcode: "",
}

export default function Check() {

    const { user } = useContext(AuthContext)
    const { total_price, cart, dispatch } = useCartContext();
    const shippingfee = 0;
    const ordertotal = total_price + shippingfee;
    const [state, Setstate] = useState(initialState)
    const [loading, setloading] = useState(false)

    const handelchange = (e) => {
        Setstate(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handelsubmit = async e => {
        e.preventDefault()
        let {
            firstname,
            lastname,
            email,
            phone,
            address,
            countryname,
            town,
            postcode,
        } = state
        if (!firstname) {
            return toast.warning("Please Enter FIRST NAME", { position: "bottom-left" })
        }
        if (!lastname) {
            return toast.warning("Please Enter LAST NAME", { position: "bottom-left" })
        }
        if (!email) {
            return toast.warning("Please Enter EMAIL", { position: "bottom-left" })
        }
        if (!phone) {
            return toast.warning("Please Enter PHONE", { position: "bottom-left" })
        }
        if (!address) {
            return toast.warning("Please Enter ADDRESS", { position: "bottom-left" })
        }
        if (!countryname) {
            return toast.warning("Please Enter COUNTRY", { position: "bottom-left" })
        }
        if (!town) {
            return toast.warning("Please Enter TWON / CITY", { position: "bottom-left" })
        }
        if (!postcode) {
            return toast.warning("Please Enter POSTAL CODE", { position: "bottom-left" })
        }
        setloading(true)
        const product = cart
        let id = Math.random().toString(36).slice(2)
        try {
            await setDoc(doc(firestore, "orders", id), {
                state, ordertotal, product, id: id, uid: user.uid, status: "pending"
            })
            toast.success("Order Submit Successfully", { position: "bottom-left" })
        } catch (e) {
            toast.error(" Something Went Wrong Please Try Again", { position: "bottom-left" })
        }
        Setstate(initialState)
        dispatch({ type: "CLEAR_CART" });
        setloading(false)
    }
    
    return (
        <>
            <TopBar title="CheckOut" />
            <div className="check">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-6 me-4 mb-4 rounded-3 p-3 bg">
                            <h4>Billing Details</h4>
                            <form>
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-6 mt-3">
                                        <label>First Name <span className='text-danger'> *</span></label>
                                        <input type="text" name='firstname' className="border-danger form-control shadow-none" value={state.firstname} placeholder="First Name" required onChange={handelchange} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6 mt-3">
                                        <label>Last Name <span className='text-danger'> *</span></label>
                                        <input type="text" name='lastname' className="border-danger form-control shadow-none" placeholder="Last name" required value={state.lastname} onChange={handelchange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-6 mt-3">
                                        <label>Phone <span className='text-danger'> *</span></label>
                                        <input type="number" name='phone' className="border-danger form-control shadow-none" placeholder="Phone Number" required value={state.phone} onChange={handelchange} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6 mt-3">
                                        <label>Email Address <span className='text-danger'> *</span></label>
                                        <input type="email" name='email' className="border-danger form-control shadow-none" placeholder="Email" required value={state.email} onChange={handelchange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-6 mt-3">
                                        <label>Country <span className='text-danger'> *</span></label>
                                        <input type="text" name='countryname' className="border-danger form-control shadow-none" placeholder="Country" required value={state.countryname} onChange={handelchange} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6 mt-3">
                                        <label>Town / City <span className='text-danger'> *</span></label>
                                        <input type="text" name='town' className="border-danger form-control shadow-none" placeholder="Town / City" required value={state.town} onChange={handelchange} />
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12 col-md-6 col-lg-6 mt-3">
                                        <label>Street Address <span className='text-danger'> *</span></label>
                                        <input type="text" name='address' className="border-danger form-control shadow-none" placeholder="Street Address" required value={state.address} onChange={handelchange} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6 mt-3">
                                        <label>PostCode / ZIP <span className='text-danger'> *</span></label>
                                        <input type="number" name='postcode' className="border-danger form-control shadow-none" placeholder="Code" required value={state.postcode} onChange={handelchange} />
                                    </div>
                                </div>
                                <h4>Payment Information</h4>
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <div className="form-check form-switch my-3">
                                            <input className="form-check-input bg-danger shadow-none text-white" type="checkbox" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="ture" id="flexSwitchCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Cash On Delivery</label>
                                        </div>
                                        <div className="collapse mt-2 my-3 " id="collapseExample">
                                            <div className="card card-body">
                                                Pay with cash upon delivery.
                                            </div>
                                        </div>
                                        <div className="form-check my-3  border-bottom border-danger">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label">
                                                I have read and agree to the website <span className='fw-bold'>terms and conditions <span className='text-danger'> *</span></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-12 col-md-12 col-lg-5 rounded-3 mb-4 p-3">
                            <div className="p-3 text-center bg border-bottom border-danger border-2">
                                <p><span>SubTotal:</span>
                                    <span className='ms-2 text-danger border-bottom border-danger border-2'>${(total_price)}</span>
                                </p>
                                <p><span>Shopping Fee:</span>
                                    <span className='ms-2 text-danger border-bottom border-danger border-2'>${(shippingfee)}</span>
                                </p>
                                <p><span>Order Total:</span>
                                    <span className='ms-2 text-danger border-bottom border-danger border-2'>${(total_price + shippingfee)}</span>
                                </p>
                            </div>
                            <button type='button' className="bth-hover bg-light w-100 rounded-1" onClick={handelsubmit}>

                                {loading
                                    ? <div className="spinner-border text-light spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    : "Place Order"
                                }
                            </button>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
