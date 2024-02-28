import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/images/footer-logo.jpg';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer bg-dark py-4 mt-5">
      <footer className="mb-0 container text-light">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3 mb-3">
            <img src={logo} className='w-50' />
            <p>The efficacy of these products has not been confirmed by FSA or MHRA-approved research. These products are not intended to diagnose, treat, cure or prevent any disease.</p>
            <ul className="nav">
              <li className="nav-item mx-2 mb-3">
                <div className="d-flex align-items-center">
                  <a className="icon p-2 rounded-circle py-1 bg-white" href='https://www.facebook.com/androidWorlduae?mibextid=ZbWKwL' target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </div>
              </li>
              <li className="nav-item mx-2 mb-3">
                <div className="d-flex align-items-center">
                  <div className="icon p-2 rounded-circle py-1 bg-white">
                    <i className="fa-brands fa-twitter"></i>
                  </div>
                </div>
              </li>
              <li className="nav-item mx-2 mb-3">
                <div className="d-flex align-items-center">
                  <div className="icon p-2 rounded-circle py-1 bg-white">
                    <i className="fa-brands fa-youtube"></i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 col-lg-2 mb-3 show-none">
            <h5>UseFull Links</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0">About Us</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0">FAQ</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0">Location</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0">Contact</Link></li>
            </ul>
          </div>
          <div className="col-12 col-md-4 col-lg-2 mb-3 show-none">
            <h5>Customer Service</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0">Return Policy</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0">Privacy Policy</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0">Whole Sale</Link></li>
            </ul>
          </div>
          <div className="col-12 col-md-4 col-lg-2 mb-3 show-none">
            <h5>MY ACCOUNTS</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0">My Profile</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0">Order Tracking</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0">Wishlist</Link></li>
            </ul>
          </div>
          <div className="col-12 col-md-4 col-lg-3 mb-3">
            <h5>Contact Us</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-3">
                <div className="d-flex align-items-center">
                  <div className="icon p-2 rounded-circle py-1 bg-white">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <a className="nav-link p-0 ps-2" href={'tel:+971563548948'} target='_blank'>+971563548948</a>
                </div>
              </li>
              <li className="nav-item mb-3">
                <div className="d-flex align-items-center">
                  <div className="icon p-2 rounded-circle py-1 bg-white">
                    <i className="fa-solid fa-at"></i>
                  </div>
                  <a href={'mailto:usmanworld948@gmail.com'} target='_blank' className="nav-link text-warp p-0 ps-2">usmanworld948@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-6">
            <span>&copy; {year} AW_UAE. All Rights Reserved.</span>
          </div>
          <div className="col-12 col-md-6 col-lg-6 text-end">
            <span>
              Developed By{' '}
              <a href="mailto:ijjazahmad705@gmail.com">
                IjjazAhmad
              </a>
              .
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
