import React from 'react'
export default function CartAmountToggle({ amount, setDecrease, setIncrease }) {
    return (
        <div className="d-flex">
            <button className='btn btn-danger btn-sm  m-0 mx-3' onClick={() => setDecrease()}>
                -
            </button>
            <p className='mt-4 p-2'>{amount}</p>
            <button className='btn btn-danger btn-sm   m-0 mx-3' onClick={() => setIncrease()}>
                +
            </button>
        </div>
    )
}
