import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProductContext } from '../../Pages/Context/ProductContext'
import { useCartContext } from '../../Pages/Context/CartContext'
import CartAmountToggle from '../CartAmountToggle'
export default function SingleProduct() {
  const { addtoCart } = useCartContext();
  const { Product, isLoading } = useProductContext()
  const [amount, setAmount] = useState(1)
  const { id } = useParams()
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1)
  }
  const setIncrease = () => {
    setAmount(amount + 1)
  }
  if (isLoading) {
    return <div className="container">
      <div className="row">
        <div className="col-1 mx-auto">
          <div className="spinner-border my-5 " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  }
  return (
    <div className='single'>
      <div className='container mt-5'>
        {Product.map((singleProduct, i) => {
          if (singleProduct.id === id) {
            return (
              <>
                <div className='row' key={i}>
                  <div className='col-12 col-md-8 col-lg-6 d-flex justify-content-center align-items-center' >
                    <img src={singleProduct.image} className='img-fluid single-img' />
                  </div>
                  <div className='col-12 col-md-8 col-lg-6'>
                    <div className='product-data'>
                      <h2>{singleProduct.name}</h2>
                      <div className="d-flex star">
                        <p className='text-warning me-3'> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star-half-stroke"></i> </p>
                        <p>({singleProduct.reviews}  Customer Reviews)</p>
                      </div>
                      <p> <span className='text-danger'>Deal of the day :</span> ${singleProduct.price}</p>
                      <div dangerouslySetInnerHTML={{__html: singleProduct.description}}></div>
                      <p>Available : <span className='text-danger'>{singleProduct.stock > 0 ? "In Stock" : "Not Available"}</span></p>
                      <p>id : <span className='text-danger'>{singleProduct.id}</span></p>
                      <p>Brands : <span className='text-danger'>{singleProduct.company}</span></p>
                      <hr style={{ width: "90%" }} />
                      {singleProduct.stock > 0
                        ?
                        <CartAmountToggle
                          amount={amount}
                          setDecrease={setDecrease}
                          setIncrease={setIncrease}
                        />
                        : ""}
                      <Link className='btn btn-dark bth-hover bg-success my-3 text-decoration-none text-white' onClick={() => addtoCart(amount, singleProduct)} >Add To Cart</Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h3>Product Description</h3>
                    <p className='border border-2 rounded-3 p-3 w-100' style={{ minHeight: "200px" }}><div dangerouslySetInnerHTML={{__html: singleProduct.description}}></div>
                    </p>
                  </div>
                </div>
              </>
            )
          }
        })
        }
      </div>
    </div>
  )
}
