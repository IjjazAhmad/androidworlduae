import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartContext } from '../Pages/Context/CartContext'

export default function ProCard({ item }) {
    const { addtoCart } = useCartContext()
    const [amount, setamount] = useState(1)
    const { name } = item
    const wordsArray = name.split("");
    const title = wordsArray.slice(0, 15).join("");
    const handelAddinCart = () => {
        addtoCart(amount, item)
    }
    return (
        <div className="product-grid mx-2">
            <div className="product-image">
                <div className="image d-flex justify-content-center">
                    <img src={item.image} className='img-fluid' />
                </div>
                <span className="product-discount-label">{item.company}</span>
                <ul className="product-links">
                    <li><Link to={`/singleproduct/${item.id}`}><i className='fa fa-eye'></i></Link></li>
                    <li><Link onClick={() => handelAddinCart()}><i className='fa fa-shopping-bag'></i></Link></li>
                </ul>
            </div>
            <div className="product-content">
                <div className='d-flex justify-content-between'>
                    <span className='title'>{title}...</span>
                    <span className='price'>AED {item.price}</span>
                </div>
            </div>
            <div>
                <button href="/" className="add-to-cart border-0" onClick={handelAddinCart}>Add to Cart</button>
            </div>

        </div>
    )
}
