import React, { useEffect, useState } from 'react'
import DashBordCard from '../../../Components/DasBordCard/DashBordCard'
import { Link } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { firestore, storage } from '../../../config/firebase'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { useProductContext } from '../../Context/ProductContext'
import { toast } from 'react-toastify'
import { deleteObject, ref } from 'firebase/storage'
import { useFilterProductContext } from '../../Context/Filterproduct'

export default function Home() {
  const { dispatch, products, users, categories, orders } = useProductContext()
  const [product, setproduct] = useState(products)
  const [dashbordproduct, setdashbordproduct] = useState(products)
  const [categorie, setcategorie] = useState(categories)
  const { filters: { sidetext } } = useFilterProductContext();
  const [loader, setLoader] = useState("")
  const [TotalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    let tempfilterproduct = [...product];
    if (sidetext) {
      tempfilterproduct = tempfilterproduct.filter((curelem) => {
        return curelem.name.toLowerCase().includes(sidetext)
      })
    }
    setdashbordproduct(tempfilterproduct)
    console.log("🚀 ~ useEffect ~ tempfilterproduct:", tempfilterproduct)
  }, [sidetext])
  useEffect(() => {
    const calculatedTotalAmount = orders.reduce((acc, order) => {
      return acc + Number(order.ordertotal);
    }, 0);
    setTotalAmount(calculatedTotalAmount)

  }, [])
  const handelDelte = async (product) => {
    console.log("🚀 ~ handelDelte ~ product:", product)
    setLoader(product.id);
    try {
      await deleteObject(ref(storage, product.image));

      await deleteDoc(doc(firestore, 'Products', product.id));

      let newProductList = product.filter((item) => item.id !== product.id);
      setproduct(newProductList);
      dispatch({ type: "SET_API_DATA", payload: newProductList });

      setLoader(false);
      toast.success("Success! Product deleted");
    } catch (error) {
      setLoader(false);
      toast.error("Error! Product not deleted");
      console.error("Error deleting product and associated image:", error);
    }
  }
  const HandelCatDelete = async (cate) => {
    try {
      setLoader(cate.id)
      const productsQuerySnapshot = await getDocs(query(collection(firestore, 'Products'), where('selectedcategory', '==', cate.category)));
      const deleteProductPromises = productsQuerySnapshot.docs.map(async (productDoc) => {
        await deleteObject(ref(storage, productDoc.data().image));
        await deleteDoc(doc(firestore, 'Products', productDoc.id));
      });
      await Promise.all(deleteProductPromises);
      await deleteObject(ref(storage, cate.img));
      await deleteDoc(doc(firestore, 'Category', cate.id))
      let newProductList = product.filter((item) => item.selectedcategory !== cate.category);
      setproduct(newProductList);
      dispatch({ type: "SET_API_DATA", payload: newProductList });
      let newdoc = categorie.filter((item) => {
        return item.id != cate.id
      });
      setcategorie(newdoc)

      dispatch({ type: "SET_CATEGORY_DATA", payload: newdoc });
      setLoader(false)
    } catch (error) {
      console.log("🚀 ~ HandelCatDelete ~ error:", error)
      setLoader("")
    }
  }
  return (
    <div className="container ps-5">
      <div className="section cat">
        <h3>Categories</h3>
        <div className="row">
          <div className="col-12 mb-2 col-md-6 col-lg-3">
            <Link to={'/dashbord/order'} className='text-decoration-none'>
              <DashBordCard title="Total Orders" totalOrder={orders.length} bg="primary" icon="chart-bar" />
            </Link>
          </div>
          <div className="col-12 mb-2 col-md-6 col-lg-3">
            <DashBordCard title="Total Products" totalOrder={product.length} bg="info" icon="chart-area" />
          </div>
          <div className="col-12 mb-2 col-md-6 col-lg-3">
            <Link to={'/dashbord/user'} className='text-decoration-none'>
              <DashBordCard title="Total Users" totalOrder={users.length} bg="danger" icon="users" />
            </Link>
          </div>
          <div className="col-12 mb-2 col-md-6 col-lg-3">
            <Link to={'/dashbord/user'} className='text-decoration-none'>
              <DashBordCard title="Total Amount" totalOrder={`AED ${TotalAmount}`} bg="warning" icon="money-check-dollar" />
            </Link>
          </div>

        </div>
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
                <div className='py-3 my-5 cat-card bg-dark rounded-4 me-2'>
                  <div className="d-flex justify-content-center align-items-center flex-column text-center">
                    {
                      loader == item.id ?
                        <div className="spinner-border text-center" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div> :
                        <>
                          <div className="icon p-3 d-flex flex-column justify-content-center align-items-center bg-primary-subtle rounded-2" style={{ height: "120px", width: "120px" }} >
                            <i className='fa fa-trash delet' onClick={() => HandelCatDelete(item)}></i>
                            <img src={item.img} className='rounded-circle' style={{ height: "90px", width: "90px" }} />
                          </div>
                          <h5 className='text-black mt-2 mb-0'>{item.category}</h5>
                        </>
                    }
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <h3>Products</h3>
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">IMAGE</th>
              <th scope="col">NAME</th>
              <th scope="col">PRICE</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {dashbordproduct.map((item, j) => {

              return (
                <tr key={j}>
                  <th scope="row">{j + 1}</th>
                  <td className='w-25'><img src={item.image} className='cart-img' /></td>
                  <td>{item.name}</td>
                  <td>AED {(item.price)}</td>
                  <td>
                    <button className="text-white py-2 px-3 btn btn-danger" onClick={() => handelDelte(item)}>

                      {
                        loader == item.id ?
                          <div className="spinner-border spinner-border-sm text-center" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div> :
                          <>
                            Delete
                          </>
                      }
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
