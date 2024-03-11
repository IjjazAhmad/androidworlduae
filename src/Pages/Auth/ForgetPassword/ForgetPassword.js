import React, { useState } from 'react'
import { auth } from '../../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import img from '../../../Assets/images/Forgot password-amico.png'
import { Link } from 'react-router-dom';
const initialState = { email: "" }
export default function Login() {
  const [state, setstate] = useState(initialState)
  const [loading, setloading] = useState(false)

  const handelChange = e => {
    e.preventDefault()
    setstate(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setloading(true)
      const { email } = state;
      if (!email) {
        return toast.info("Please Enter Email", { position: "bottom-left" });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return toast.info("Please Enter A Valid Email Address", { position: "bottom-left" });
      }

      const userCredential = await sendPasswordResetEmail(auth, email);
      toast.success("Please Check Your Mail.", { position: "bottom-left" });
      setloading(false)
      setstate(initialState)
    } catch (error) {
      setloading(false)
      setstate(initialState)
      console.error(error);
      toast.error("Something Went Wrong Please Try Again", { position: "bottom-left" });
    }
  };


  return (
    <div className="auth">
      <div className="container">
        <div className="bg mt-5 rounded-3 p-3">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 rounded-3">
              <img src={img} className="img-fluid" />
            </div>
            <div className="col-12 col-md-6 col-lg-7">
              <form className="p-5 mt-5" onSubmit={handleSubmit}>
                <h2 className="text-center  mb-0">Email</h2>
                <div className="row my-3">
                  <div className="col">
                    <label >Email</label>
                    <input type="email" className="border-danger form-control shadow-none" value={state.email} name='email' onChange={handelChange} required placeholder="Email" />
                  </div>
                </div>
                <div className="row my-3  mb-5 text-center">
                  <div className="col">
                    <button type='submit' className="btn btn-danger text-white px-4">
                      {loading ? <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div> : <>Send Mail</>}
                    </button>
                    <p className="mt-4 ">Already have an account?<Link to="/auth/login"> Login</Link></p>
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
