import React, { useEffect, useRef, useState } from 'react'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useProductContext } from '../../../Context/ProductContext'
import { useCartContext } from '../../../Context/CartContext'
import { Link } from 'react-router-dom'
export default function Hero() {
    const { products } = useProductContext()
    const { addtoCart } = useCartContext()
    const [amount, setamount] = useState(1)
    const swiperRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.slideNext();
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero">
            <div className="container rounded-4">
                <Swiper
                    ref={swiperRef}
                    autoplay={{ delay: 500 }}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    pagination={{ clickable: true }}>
                    {products.map((item, i) => {
                        if (item.hersilde === "true") {
                            return (
                                <SwiperSlide key={i}>
                                    <div className="row py-5 justify-content-center align-items-center">
                                        <div className='col-12 col-md-6 col-lg-5'>
                                            <p className='text-body-tertiary'>TRENDING COLLECTION <i className="fa-solid fa-bolt text-warning"></i></p>

                                            <h1>{item.name}</h1>
                                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae quo atque voluptates cum eaque ipsam.</p>
                                            <div onClick={() => addtoCart(amount, item)}>
                                                <Link to={'/cart'}  className='btn btn-danger rounded-5 text-white px-4 mb-2'>Buy Now</Link>
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-5 d-flex justify-content-center item-center'>
                                            <img src={item.image} alt="heroimage" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    })}
                </Swiper>
            </div>
        </div >
    )
}
