import React from 'react'
import { useProductContext } from '../../../Context/ProductContext'
import ProductByCat from '../../../../Components/ProductByCategory/ProductByCat';
import Offersection from '../../../../Components/ProductByCategory/Offersectibo';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';

export default function Product() {
    const { isLoading, categories } = useProductContext()
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
        <div className="arvel">
            <div className="container">
                <div className="bg-success-subtle px-5 py-3 mb-5 rounded-3">
                    <h1 className="heading-2 text-start my-3 fw-semibold">
                        SHOP BY CATEGORY
                    </h1>
                    <div className="row fw-semibold mb-5">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            navigation
                            breakpoints={{

                                576: {
                                    slidesPerView: 2,
                                },

                                768: {
                                    slidesPerView: 4,
                                },

                                992: {
                                    slidesPerView: 6,
                                },
                            }}>
                            {categories.map((item, i) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <div>
                                            <Link to={`/category/${item.category}`} className='text-decoration-none'>
                                                <div className="d-flex justify-content-center align-items-center flex-column text-center">
                                                    <div className="icon p-3 d-flex justify-content-center align-items-center bg-primary-subtle rounded-circle" style={{ height: "120px", width: "120px" }} >
                                                        <img src={item.img} className='rounded-circle' style={{ height: "90px", width: "90px" }} />
                                                    </div>
                                                    <h5 className='text-black'>{item.category}</h5>
                                                </div>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>

            <Offersection categoryName="WEEKLY SPECIAL OFFERS" />
            <Offersection categoryName="TRENDING DEALS" />
            <Offersection categoryName="RECOMMENDED FOR YOU" />
            {
                categories.map((item, i) => {
                    if (i < 3) {
                        return (
                            <div key={i}>
                                <ProductByCat categoryName={item.category} />
                            </div>
                        )
                    }
                })
            }
        </div >
    )
}
