import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { useProductContext } from '../../Context/ProductContext';

export default function UserProfile() {
    const { orders } = useProductContext();
    const [order, setorder] = useState(orders)
    const { user } = useContext(AuthContext)
    const [modelProduct, setmodelProduct] = useState([])
    const handelModelProduct = (order) => {
        setmodelProduct(order)
    }
    const handeldelet = async (order) => {
        try {
            await deleteDoc(doc(firestore, "orders", order.id))
            let newdoc = orders.filter((item) => {
                return item.id != order.id
            });
            setorder(newdoc)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12 col-lg-4">
                        <div className="mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                        <div className="mt-3">
                                            <h4 className='text-capitalize'>
                                                {user.firstname} {user.lastname}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-8">

                        <div className="card">
                            <div className="card-body my-2 text-capitalize">
                                <div className="row pt-2">
                                    <div className="col">
                                        <h6>Full Name</h6>
                                    </div>
                                    <div className="col-9 text-secondary">
                                        {user.firstname} {user.lastname}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <h6>email</h6>
                                    </div>
                                    <div className="col-9 text-secondary text-lowercase">
                                        {user.email}
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table text-center table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>STATUS</th>
                                <th>TOTAL PRICE</th>
                                <th>PRODUCT</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                order.map((order, i) => {
                                    if (user.uid === order.uid) {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{order.status}</td>
                                                <td>AED {order.ordertotal}</td>
                                                <td><button className="text-white py-2 px-3 btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handelModelProduct(order.product)}>ProductView</button></td>
                                                <td>
                                                    <button className="text-white py-2 px-3 btn btn-danger" onClick={() => handeldelet(order)}>Cancel</button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">View Order</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table align-middle text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">IMAGE</th>
                                        <th scope="col">NAME</th>
                                        <th scope="col">PRICE</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {modelProduct.map((item, i) => {

                                        return (
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td className='w-25'><img src={item.image} className='cart-img' /></td>
                                                <td>{item.name}</td>
                                                <td>AED {(item.price)}</td>
                                                <td><p>{item.amount}</p></td>
                                                <td>AED {(item.price * item.amount)} </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
