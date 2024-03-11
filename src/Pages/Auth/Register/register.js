import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { auth } from '../../../config/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { firestore } from '../../../config/firebase';
import img from '../../../Assets/images/5180200.png'
const initialState = { firstname: "", lastname: "", email: "", password: "", confirmpassword: "" }
export default function Register() {
  const navegate = useNavigate()
  const { dispatch } = useContext(AuthContext)
  const [state, setstate] = useState(initialState)
  const handelChange = e => {
    e.preventDefault()
    setstate(state => ({ ...state, [e.target.name]: e.target.value }))
  }
  const handelSubmit = async () => {
    const { firstname, lastname, email, password, confirmpassword } = state
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstname) {
      return toast.info("Please Enter Firstname", { position: "bottom-left" })
    }
    if (firstname.length < 3) {
      return toast.info("Firstname Must Be 3 Characters", { position: "bottom-left" })
    }
    if (!lastname) {
      return toast.info("Please Enter lastname", { position: "bottom-left" })
    }
    if (lastname.length < 3) {
      return toast.info("LastName Must Be 3 Characters", { position: "bottom-left" })
    }
    if (!email) {
      return toast.info("Please Enter Email", { position: "bottom-left" })
    }
    if (!emailRegex.test(email)) {
      return toast.info("Please Enter A Valid Email Address", { position: "bottom-left" });
    }
    if (!password) {
      return toast.info("Please Enter Password", { position: "bottom-left" })
    }
    if (password.length < 6) {
      return toast.info("Password Must Be Six Characters", { position: "bottom-left" })
    }
    if (!confirmpassword) {
      return toast.info("Please Enter Confirm Password", { position: "bottom-left" })
    }
    if (confirmpassword != password) {
      return toast.info("No Password Match", { position: "bottom-left" })
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        adduserFun(user)
      })
      .catch((error) => {
        toast.error(" Something Went Wrong Please Try Again", { position: "bottom-left" })
      });
  }

  const adduserFun = async (user) => {
    const { uid, email } = user
    const { firstname, lastname, confirmpassword } = state
    const userData = { firstname, lastname, confirmpassword, email, uid }
    userData.dateCreated = serverTimestamp();
    userData.role = "user"
    userData.status = "active"
    try {
      await setDoc(doc(firestore, "Users", uid), userData)
      dispatch({ type: "LOGIN", payload: { user: userData } })
      toast.success("Add User Successfully", { position: "bottom-left" })
      navegate("/")
    } catch (err) {
      toast.error(" Something Went Wrong Please Try Again", { position: "bottom-left" })

    }
  }
  return (
    <div className="auth">
      <div className="container">
        <div className="bg mt-5 rounded-3 p-3">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 rounded-3">
              <img src={img} className="img-fluid" />
            </div>
            <div className="col-12 col-md-6 col-lg-7">
              <form className="p-4">
                <h2 className="text-center  mb-0">Sign Up</h2>
                <div className="row my-3">
                  <div className="col-12 col-md-6 col-lg-6">
                    <label >First Name</label>
                    <input type="text" className="border-danger form-control shadow-none" name='firstname' value={state.firstname} onChange={handelChange} placeholder="First name" />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <label >Last Name</label>
                    <input type="text" className="border-danger form-control shadow-none" name='lastname' value={state.lastname} onChange={handelChange} placeholder="Last name" />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col">
                    <label >Email</label>
                    <input type="email" className="border-danger form-control shadow-none" name='email' value={state.email} onChange={handelChange} placeholder="Email" />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col">
                    <label >Password</label>
                    <input type="password" className="border-danger form-control shadow-none" name='password' value={state.password} onChange={handelChange} placeholder="Password" />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col">
                    <label >Confirm Password</label>
                    <input type="password" className="border-danger form-control shadow-none" name='confirmpassword' value={state.confirmpassword} onChange={handelChange} placeholder="Confirm Password" />
                  </div>
                </div>
                <div className="row my-3  mb-5 text-center">
                  <div className="col">
                    <button type="button" onClick={handelSubmit} className="btn btn-danger text-white px-4" >Create Account</button>
                    <p className="mt-4 ">Already have an account?<Link to="/auth/login" className=' '>Login</Link></p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
