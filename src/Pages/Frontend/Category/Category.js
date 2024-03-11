import React, { useEffect, useState } from 'react'
import ProCard from '../../../Components/ProCard'
import { useProductContext } from '../../Context/ProductContext';
import { Link, useParams } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Category() {
  const { products, categories } = useProductContext()
  let { name } = useParams()
  const [fitlteProducts, SetfitlteProducts] = useState([]);
  useEffect(() => {
    let value = name;
    let tempfilterproduct;
    let fitlte_Products = products;
    tempfilterproduct = [...fitlte_Products];
    if (value !== "All") {
      tempfilterproduct = tempfilterproduct.filter((item) => {
        return item.selectedcategory === value;
      });
    }
    SetfitlteProducts(tempfilterproduct);
  }, [name])
  return (
    <div className="container">
      <h1 className="heading-2 text-start my-3 fw-semibold">
        Shop By Category
      </h1>
      <div className="row fw-semibold mb-5">
        {categories.map((item, j) => {
          return (

            <div key={j} className="col-6 col-md-3 col-lg-2">
              <Link to={`/category/${item.category}`} className='text-decoration-none'>
                <div className="d-flex justify-content-center align-items-center flex-column text-center">
                  <div className="icon p-3 d-flex justify-content-center align-items-center bg-primary-subtle rounded-circle" style={{ height: "120px", width: "120px" }} >
                    <img src={item.img} className='rounded-circle' style={{ height: "90px", width: "90px" }} />
                  </div>
                  <h5 className='text-black'>{item.category}</h5>
                </div>
              </Link>
            </div>

          )
        })}
      </div>
      <div className="bg-warning-subtle px-5 py-3 mb-5 rounded-3">
        <h1 className="heading-2 text-start my-3">
          Top Deals, Big Savings
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
            {fitlteProducts.map((item, i) => {
              if (i < 10) {
                return (
                  <SwiperSlide key={i}>
                    <ProCard item={item} />
                  </SwiperSlide>
                )
              }
            })}
          </Swiper>
        </div>
      </div>
      <div className="bg-success-subtle px-5 py-3 mb-5 rounded-3">
        <h1 className="heading-2 text-start my-3">
          TRENDING DEALS
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
            {fitlteProducts.map((item, i) => {
              if (i > 9 && i < 20) {
                return (
                  <SwiperSlide key={i}>
                    <ProCard item={item} />
                  </SwiperSlide>

                )
              }
            })}
          </Swiper>
        </div>
      </div>
      <div className="bg-warning-subtle px-5 py-3 rounded-3">
        <h1 className="heading-2 text-start my-3">
          Top Deals - Packaged
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
            {fitlteProducts.map((item, i) => {
              if (i > 19) {
                return (
                  <SwiperSlide key={i}>
                    <ProCard item={item} />
                  </SwiperSlide>
                )
              }
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
