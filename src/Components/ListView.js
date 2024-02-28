import React, { useState } from 'react'
import { useCartContext } from '../Pages/Context/CartContext'

export default function ListView({ products }) {
    const { addtoCart } = useCartContext()
    const [amount, setamount] = useState(1)
    const handelAddinCart = (item) => {
        addtoCart(amount, item)
    }
    return (
        <div>
            {products.map((doc, i) => {
                return <div key={i} className="row product-card m-2 py-2">
                    <div className='col-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center'>
                        <div className='image'>
                            <img src={doc.image} className='border-0' style={{ width: "17rem", height: "17rem" }} />
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-6'>
                        <div className='pt-2'>
                            <h2>{doc.name}</h2>
                            <div className="d-flex star">
                                <p className='text-warning me-3'> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star-half-stroke"></i> </p>
                            </div>
                            <h4>AED {(doc.price)}</h4>
                            <div dangerouslySetInnerHTML={{__html: doc.description.slice(0, 130)}}></div>
                            <button className='btn btn-dark bth-hover bg-success p-3 py-2' onClick={()=>handelAddinCart(doc)}>Add To Cart</button>
                        </div>
                    </div>
                </div>

            })}
        </div>
    )
}
