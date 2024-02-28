import React from 'react'
import { useProductContext } from '../../Context/ProductContext'

export default function User() {
  const { users } = useProductContext()

  return (
    <div className="container">
      <div className="row">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">FIRST NAME</th>
                <th scope="col">LAST NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curelem, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{curelem.firstname}</td>
                    <td>{curelem.lastname}</td>
                    <td>{curelem.email}</td>
                    <td>{curelem.status}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
