import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.bundle'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './Pages/Context/ProductContext';
import { FilterContextProvider } from './Pages/Context/Filterproduct';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './Pages/Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { CartContextProvider } from './Pages/Context/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AuthContextProvider>
          <FilterContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </FilterContextProvider>
        </AuthContextProvider>
      </AppProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);
reportWebVitals();
