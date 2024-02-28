import React from 'react'
import Topbar from '../../../Components/TopBar'
import CartAmountToggle from '../../../Components/CartAmountToggle'
import { useCartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cart, removeItem, clearCart, total_price, setDecrement, setIncrement,dispatch } = useCartContext();
  return (
    <>
      <Topbar title="CART" />
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3>Your Cart Items</h3>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
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
                {cart.map((curelem, i) => {
                  let price = curelem.price
                  return (
                    <tr key={i}>
                      <th scope="row"><i className=" fa-solid fa-trash text-danger" onClick={() => removeItem(curelem.id)}></i></th>
                      <td className='w-25'><img src={curelem.image} className='cart-img' /></td>
                      <td>{curelem.name}</td>
                      <td>${(price)}</td>
                      <td> <CartAmountToggle
                        amount={curelem.amount}
                        setDecrease={() => setDecrement(curelem.id)}
                        setIncrease={() => setIncrement(curelem.id)}
                      /> </td>
                      <td>${(curelem.price * curelem.amount)} </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row  border-bottom border-danger border-2 pb-3">
          <div className="col-6 'col-md-6 col-lg-6">

            <button className='bth-hover bg-success rounded-1'>
              <Link className=' text-decoration-none text-white' to='/shop'>Continue Shopping</Link>
            </button>
          </div>
          <div className="col-6 col-md-6 col-lg-6 text-end">
            <button className='bth-hover bg-success rounded-1' onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="p-3 text-center bg border-bottom border-danger border-2">
              <p><span>SubTotal:</span>
                <span className='ms-2 text-danger border-bottom border-danger border-2'>${(total_price)}</span>
              </p>
              <p><span>Shipping Fee:</span>
                <span className='ms-2 text-danger border-bottom border-danger border-2'>$00.00</span>
              </p>
              <p><span>Order Total:</span>
                <span className='ms-2 text-danger border-bottom border-danger border-2'>${(total_price)}</span>
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-8 text-end pt-5">
            {cart
              ? <div>
                <Link className=' text-decoration-none text-white' to='/checkout'>
                  <button className='bth-hover bg-light rounded-1 mt-5'>
                    Check Out
                  </button>
                </Link>
              </div>
              : ""}
          </div>
        </div>
      </div>
    </>
  )
}
