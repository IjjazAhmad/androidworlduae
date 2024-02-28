import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useProductContext } from '../../Pages/Context/ProductContext';
import ProCard from '../ProCard';
export default function Offersectibo(props) {
    const { products } = useProductContext()

    return (
        <div className="container">
            <div className="bg-success-subtle px-5 py-3 mb-5 rounded-3">
                <h1 className="heading-2 text-start my-3">
                    {props.categoryName}
                </h1>
                <div className="row mb-4">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        navigation
                        breakpoints={{
                            576: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 4,
                            },
                        }}>
                        {products.map((item, i) => {
                            if ("WEEKLY SPECIAL OFFERS" === props.categoryName) {
                                if (i < 10) {
                                    return (
                                        <SwiperSlide key={i}>
                                            <ProCard item={item} />
                                        </SwiperSlide>
                                    )
                                }
                            }
                            if ("TRENDING DEALS" === props.categoryName) {
                                if (i > 9 && i < 20) {
                                    return (
                                        <SwiperSlide key={i}>
                                            <ProCard item={item} />
                                        </SwiperSlide>
                                    )
                                }
                            }
                            if ("RECOMMENDED FOR YOU" === props.categoryName) {
                                if (i > 19 && i < 30) {
                                    return (
                                        <SwiperSlide key={i}>
                                            <ProCard item={item} />
                                        </SwiperSlide>
                                    )
                                }
                            }
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
