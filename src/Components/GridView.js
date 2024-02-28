import React from 'react'
import ProCard from '../Components/ProCard'
export default function GridView({ products }) {
    return (
        <div className='row'>
            {products.map((doc, i) => {
                return (
                        <div key={i} className="col-12 col-md-6 col-lg-4 mb-3">
                            <ProCard item={doc} />
                        </div>
                )
            })}
        </div>
    )
}
