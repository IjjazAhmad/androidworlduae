import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import img from '../../../Assets/images/My password-amico.png'
const initialState = { email: "", password: "", }
export default function Login() {
  const navegate = useNavigate()
  const [state, setstate] = useState(initialState)
  const handelChange = e => {
    e.preventDefault()
    setstate(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  const handelSubmit = () => {
    const { email, password } = state
    if (!email) {
      return toast.info("Please Enter Email", { position: "bottom-left" })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.info("Please Enter A Valid Email Address", { position: "bottom-left" });
    }
    if (!password) {
      return toast.info("Please Enter Password", { position: "bottom-left" })
    }
    if (password.length < 6) {
      return toast.info("Password Must Be Six Characters", { position: "bottom-left" })
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navegate("/")
        toast.success("Login successfully", { position: "bottom-left" })
      })
      .catch((error) => {

        toast.error("Something Went Wrong Please Try Again", { position: "bottom-left" })
      });
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
              <form className="p-5 mt-5">
                <h2 className="text-center  mb-0">Login</h2>
                <div className="row my-3">
                  <div className="col">
                    <label >Email</label>
                    <input type="email" className="border-danger form-control shadow-none" value={state.email} name='email' onChange={handelChange} required placeholder="Email" />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col">
                    <label >Password</label>
                    <input type="password" className="border-danger form-control shadow-none" value={state.password} name='password' onChange={handelChange} required placeholder="Password" />
                  </div>
                </div>
                <div className="row my-3  mb-5 text-center">
                  <div className="col">
                    <button type="button" onClick={handelSubmit} className=" btn bg " >Login</button>
                    <p className="mt-4 ">Create an account?<Link to="/auth/register"> Register</Link></p>
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
