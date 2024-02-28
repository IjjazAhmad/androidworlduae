import React, { useState } from 'react'
import { firestore } from '../../../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useProductContext } from '../../Context/ProductContext'
export default function Order() {
  const { orders } = useProductContext()
  const [modelProduct, setmodelProduct] = useState([])
  const [isLoading, setisLoading] = useState(false)


  const handelModelProduct = (order) => {
    setmodelProduct(order)
  }
  const handelUpdate = async (order) => {
    setisLoading(true)
    order.status = "complete";
    try {
      await setDoc(doc(firestore, "orders", order.id), order, { merge: true })
      setisLoading(false)
    } catch (error) {
      setisLoading(false)
    }

  }
  return (
    <>
      <div className="conainer">
        <div className="row">
          <div className="table-responsive">
            <table className="table text-center table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>NAME</th>
                  <th>ADDRESS</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>POSTALCODE</th>
                  <th>COUNTRY</th>
                  <th>TOTAL PRICE</th>
                  <th>PRODUCT</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>

                {orders.map((order, i) => {

                  return (
                    <tr key={i}>                      <td>{i + 1}</td>
                      <td>{order.state.firstname + " " + order.state.lastname}</td>
                      <td >{order.state.address}</td>
                      <td>{order.state.email}</td>
                      <td>{order.state.phone}</td>
                      <td>{order.state.postcode}</td>
                      <td>{order.state.countryname}</td>
                      <td>{order.ordertotal}</td>
                      <td><button className="text-white py-2 px-3 btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handelModelProduct(order.product)}>View</button></td>
                      <td>{order.status}</td>
                      <td>
                        {order.status === "pending"
                          ?
                          <button className="text-white py-2 px-3 btn btn-danger" onClick={() => handelUpdate(order)}>
                            {isLoading
                              ?
                              <div className="spinner-border text-white spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                              : "Complete"}
                          </button>
                          : <></>
                        }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">View Product</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <table className="table align-middle">
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
          </div>
        </div>
      </div>
    </>
  )
}

