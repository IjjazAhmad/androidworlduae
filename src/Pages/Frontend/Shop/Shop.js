import React, { useEffect } from 'react'
import { useFilterProductContext } from '../../Context/Filterproduct'
import GridView from '../../../Components/GridView';
import ListView from '../../../Components/ListView';
import { useProductContext } from '../../Context/ProductContext';

export default function Shop() {
  const { filter_products, gridview, dispatch, setListView, setGridView, shorting, all_products, filters: { text, price, maxprice }, updatefiltervalue } = useFilterProductContext();
  const { products } = useProductContext();

  useEffect(() => {
    dispatch({ type: 'LOAD_FILTER_PRODUCT', payload: products });
  }, []);
  
  const getuiniqe = (data, propety) => {
    let newVal = data.map((curelem) => {
      return curelem[propety]
    })
    return newVal = ["All", ...new Set(newVal)]
  }
  const categoryonlydata = getuiniqe(products, "selectedcategory")
  const companyonlydata = getuiniqe(products, "company")

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-12 col-lg-3'>
          <div className="row">
            <form className='mt-4' onSubmit={(e) => { e.preventDefault() }}>
              <input type='text' placeholder='Search...' className='w-100 form-control border-danger shadow-none' onChange={updatefiltervalue} name='text' value={text} />
            </form>
          </div>
          <div className="row">
            <div className='mt-4' >
              <h3>Category</h3>

              {categoryonlydata.map((cur, i) => {
                return (
                  <div className="row" key={i}>
                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="category" value={cur} onChange={updatefiltervalue} />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                          {cur}
                        </label>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="row">
            <div className='mt-4' >
              <h3>Company</h3>
              <select id='company' name='company' className="form-select border-danger shadow-none" onClick={updatefiltervalue}>
                {companyonlydata.map((curs, i) => {
                  return (
                    <option value={curs} name='company' key={i}>{curs}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="row">
            <div className='mt-4' >
              <h3>Price</h3>
              <p>${(price)}</p>
              <input
                type="range"
                name="price"
                max={maxprice}
                value={price}
                onChange={updatefiltervalue}
              />
            </div>
          </div>
        </div>
        <div className='col-12 col-md-12 col-lg-9'>
          <div className='row align-items-center'>
            <div className='col-12 col-md-6 col-lg-4'>
              <select id='sort' className="form-select border-danger shadow-none" onChange={shorting}>
                <option value="lowest">Price(Lowest)</option>
                <option value="highest">Price(Highest)</option>
                <option value="a-z">Price(A-Z)</option>
                <option value="z-a">Price(Z-A)</option>
              </select>
            </div>
            <div className='col-12 col-md-6 col-lg-5 my-2'>
              <div className='text-center mt-3'>
                <p>Total Products Is  {filter_products.length}</p>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-3 d-flex text-center px-auto'>
              <button className={gridview ? 'btn btn-dark p-3 py-1 pt-2 mt-3 mb-3 rounded-0 fs-4 mx-2 border-0' : 'active btn btn-dark p-3 py-1 pt-2 mt-3 mb-3 rounded-0 fs-4 mx-2 border-0'} onClick={setListView}><i className="fa-solid fa-bars"></i></button>

              <button className={gridview ? 'active btn btn-dark p-3 py-1 pt-2 mt-3 mb-3 rounded-0 fs-4 mx-2 border-0' : 'btn btn-dark p-3 py-1 pt-2 mt-3 mb-3 rounded-0 fs-4 mx-2 border-0'} onClick={setGridView}><i className='bx bx-grid-alt' ></i></button>
            </div>
          </div>
          <div className='row mt-4'>
            {gridview === true
              ? <GridView products={filter_products} />
              : <ListView products={filter_products} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
