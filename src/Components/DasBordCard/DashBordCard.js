import React from 'react';

export default function DashBordCard(props) {
  return (
    <div className={`card bg-${props.bg} rounded-4 border-0 text-white p-3`}>
      <div className="icon mb-2">
        <i className={`fa fa-${props.icon} text-${props.bg}`}></i>
      </div>
      <p className="mb-0 title fw-semibold">
        {props.title} <br/>
        <span className={`text-white`}>{props.totalOrder}</span>
      </p>
      </div>
  );
}
