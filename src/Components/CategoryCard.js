import React from 'react'
export default function CategoryCard({ item }) {
    return (
        <div className="card p-2">
            <div className="card-image border border-bottom">
                <img src={item.img} className="w-100" />
            </div>
            <div className="card-details text-center">
                <a className='fw-medium text-decoration-none text-dark'>{item.category}</a>
            </div>
        </div>
    )
}
