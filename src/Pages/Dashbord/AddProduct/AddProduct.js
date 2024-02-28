import React, { useEffect, useState, } from 'react'
import { setDoc, doc, getDocs, collection } from "firebase/firestore";
import { firestore } from '../../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useProductContext } from '../../Context/ProductContext';

const initialState = {
  name: "",
  disprice: "",
  company: "",
  price: "",
  selectedcategory: "",
  reviews: "",
  stock: "",
  img: "",
  image: "",
  addhero: false,
  category: "",
}

export default function AddProduct() {
  const [state, setstate] = useState(initialState)
  const { categories, products } = useProductContext()
  const [file, setfile] = useState()
  const [description, setdescription] = useState('')
  const [progress, setprogress] = useState(0)
  const [categoryloader, setcategoryloader] = useState(false)
  const [productloader, setproductloader] = useState(false)
  const [isprogress, setisprogress] = useState(false)

  const handelChange = (e) => {
    setstate(s => ({ ...s, [e.target.name]: e.target.value }))

  }

  const ImagehandelChange = (e) => {
    setfile(e.target.files[0])

  }

  const handelCategory = async () => {
    const {
      category
    } = state

    if (!file) {
      return toast.warning("Please Select Category Image", { position: "bottom-left" })
    }
    if (!category && category.length > 5) {
      return toast.warning("Please Enter Category", { position: "bottom-left" })
    }
    setcategoryloader(true)
    const fileExt = file.name.split('.').pop()
    const randomId = Math.random().toString(36).slice(3)

    const storageRef = ref(storage, `Media/${randomId}.${fileExt}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

      }, (error) => {
        // Handle unsuccessful uploads
        console.error(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          let id = Math.random().toString(36).slice(2)
          let categoryData = { category }
          categoryData.id = id
          categoryData.img = downloadURL

          try {

            await setDoc(doc(firestore, "Category", id), categoryData)
            categories.push(categoryData)
            setcategoryloader(false)
          } catch (e) {
            console.error(e)
            setcategoryloader(false)
          }

        });
      }
    )
    toast.success("Add Category SuccessFully", { position: "bottom-left" })
    setstate(initialState)

  }

  const handelSubmit = e => {
    e.preventDefault();
    let {
      disprice,
      name,
      company,
      price,
      addhero,
      selectedcategory,
      reviews,
      stock } = state;
    if (!addhero) {
      return toast.warning("Please SELECT ADD HERO SLIDE", { position: "bottom-left" })
    }
    if (!name) {
      return toast.warning("Please Enter NAME", { position: "bottom-left" })
    }
    if (!company) {
      return toast.warning("Please Enter COMPANY", { position: "bottom-left" })
    }
    if (!price) {
      return toast.warning("Please Enter PRICE", { position: "bottom-left" })
    }
    if (!file) {
      return toast.warning("Please SELECT FILE", { position: "bottom-left" })
    }
    if (!description) {
      return toast.warning("Please Enter DETAILS", { position: "bottom-left" })
    }
    if (!selectedcategory) {
      return toast.warning("Please Enter CATEGORY", { position: "bottom-left" })
    }
    if (!reviews) {
      return toast.warning("Please Enter REVIEWS", { position: "bottom-left" })
    }
    if (!stock) {
      return toast.warning("Please Enter STOCK", { position: "bottom-left" })
    }
    setproductloader(true)
    setisprogress(true)
    const fileExt = file.name.split('.').pop()
    const randomId = Math.random().toString(36).slice(3)

    const storageRef = ref(storage, `Media/${randomId}.${fileExt}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        setprogress(progress)
        if (progress == 100) {
          setTimeout(() => {
            setisprogress(false)
          }, 1000);
        }
      }, (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          state.image = downloadURL;
          let { image } = state
          let id = Math.random().toString(36).slice(2)
          let productData = {
            name,
            disprice,
            company,
            price,
            description,
            selectedcategory,
            reviews,
            stock,
            image,
            image,
            hersilde: addhero,
            id: id
          }
          try {
            await setDoc(doc(firestore, "Products", id), productData);
            products.push(productData)
            setproductloader(false)
            toast.success("Add Product SuccessFully", { position: "bottom-left" })
          }
          catch (err) {
            setproductloader(false)

          }
        });
      }
    )
    setstate(initialState)
  }

  return (
    <div className="container px-5">
      <div className="row">
        <div className="col">
          <div className="row bg p-3 my-2 mb-4 rounded-3">
            <div className="col">
              <h3 className='text-danger text-center'>Add Categories And Product </h3>
            </div>
          </div>
          <div className="row bg p-3 mb-4 text-center my-2 rounded-3">
            <div className="col">
              <button type='submit' data-bs-toggle="modal" data-bs-target="#exampleModal" className="text-white py-2 px-4 btn btn-danger">
                Add Category
              </button>
            </div>
          </div>
          <form>
            <div className="row bg p-3 my-2 mb-4 rounded-3">
              <div className="col-12 col-md-6 col-lg-6">
                <label>NAME</label>
                <input type="text" className='form-control shadow-none' name='name' value={state.name} onChange={handelChange} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label>COMPANY</label>
                <input type="text" className='form-control shadow-none' name='company' value={state.company} onChange={handelChange} />
              </div>
            </div>
            <div className="row p-3 bg my-2 mb-4 rounded-3">
              <div className="col-12 col-md-6 col-lg-6">
                <label>PRICE</label>
                <input type="number" className='form-control shadow-none' name='price' value={state.price} onChange={handelChange} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label>Discount Price</label>
                <input type="number" className='form-control shadow-none' value={state.disprice} name='disprice' onChange={handelChange} />
              </div>
            </div>
            <div className="row p-3 bg my-2 mb-4 rounded-3">
              <div className="col">
                <div className="row mb-3">
                  <div className="col">
                    <label>Image</label>
                    <input type="file" className='form-control shadow-none' onChange={ImagehandelChange} />
                  </div>
                </div>
                {isprogress
                  ? <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar text-bg-warning" style={{ width: `${progress}%` }}>{progress}</div>
                  </div>
                  : ""
                }
              </div>
            </div>
            <div className="row p-3 bg my-2 mb-4 rounded-3">
              <div className="col">
                <label className="form-label">DETAILS</label>
                <ReactQuill theme="snow" onChange={setdescription} className="ReactQuill bg-white  text-black" id='detail' value={description} />
              </div>
            </div>
            <div className="row p-3 bg my-2 mb-4 rounded-3">
              <div className="col-12 col-md-6 col-lg-6">
                <label>CATEGORY</label>
                <select className="form-select shadow-none" name='selectedcategory' value={state.selectedcategory} onChange={handelChange} >

                  <option value="">No Selected</option>
                  {categories.map((element, index) => {
                    if (index < 5) {
                      return (
                        <option key={index} value={element.category}>{element.category}</option>
                      )
                    }
                  })
                  }
                </select>
              </div>

              <div className="col-12 col-md-6 col-lg-6">
                <label>Quantity</label>
                <input type="number" className='form-control shadow-none' name='stock' value={state.stock} onChange={handelChange} />
              </div>
            </div>
            <div className="row p-3 bg my-2 mb-4 rounded-3">
              <div className="col-12 col-md-6 col-lg-6">
                <label>Add Hero Slide</label>
                <select className="form-select shadow-none" name='addhero' value={state.addhero} onChange={handelChange} >
                  <option selected value={'helo'}>No Selected</option>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>

                </select>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <label>REVIEWS</label>
                <input type="number" className='form-control shadow-none' name='reviews' value={state.reviews} onChange={handelChange} />
              </div>
            </div>
            <div className="row p-3 bg my-2 mb-4 rounded-3">
              <div className="col text-center">
                <button type='submit' onClick={handelSubmit} disabled={productloader} className="text-white py-2 px-4 btn btn-danger">
                  {productloader
                    ? <>
                      <div className="spinner-border spinner-border-sm text-white" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </>
                    : "Add Product"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div >

      <div className="modal fade" id="exampleModal" tabndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add Category</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row p-3 my-2 rounded-3">
                <div className="col text-left">
                  <label>Image</label>
                  <input type="file" className='form-control shadow-none' name='img' onChange={ImagehandelChange} />
                </div>
              </div>
              <div className="row p-3 my-2 rounded-3">
                <div className="col text-left">
                  <label>CATEGORY</label>
                  <input type="text" className='form-control shadow-none' name='category' value={state.category} onChange={handelChange} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type='submit' data-bs-dismiss="modal" onClick={handelCategory} disabled={categoryloader} className="text-white py-2 px-4 btn btn-danger">
                {categoryloader
                  ? <div className="spinner-border spinner-border-sm text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  : <>Add Category</>
                }

              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

