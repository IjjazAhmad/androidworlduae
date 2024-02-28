import React, { useEffect, useState } from 'react'
import ProCard from '../ProCard'
import { useProductContext } from '../../Pages/Context/ProductContext'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ProductByCat({ categoryName }) {
    const { products } = useProductContext()
    const [fitlteProducts, SetfitlteProducts] = useState([]);
    useEffect(() => {
        let value = categoryName;
        let tempfilterproduct;
        let fitlte_Products = products;
        tempfilterproduct = [...fitlte_Products];
        if (value !== "All") {
            tempfilterproduct = tempfilterproduct.filter((item) => {
                return item.selectedcategory === value;
            });
        }
        SetfitlteProducts(tempfilterproduct);
    }, [categoryName])

    return (
        <div className="container">
            <div className="bg-success-subtle px-5 py-3 mb-5 rounded-3">
                <h1 className="heading-2 text-start my-3">
                    {categoryName}
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
                        {fitlteProducts.map((item, j) => {
                            return (
                                <SwiperSlide key={j}>
                                        <ProCard item={item} />
                                    </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
