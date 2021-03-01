import React from 'react';

export default function Card(props) {
  return (
    <div className="card card-stats">
      <div className={`card-header card-header-${props.color} card-header-icon`}>
        <div className="card-icon">
          <i className="material-icons">{props.icon}</i>
        </div>
        <p className="card-category">{props.category}</p>
        <h3 className="card-title">{props.cardTitle}
        </h3>
      </div>
      <div className="card-footer">
        <div className="stats">
          <i className={`material-icons ${props.iconColor}`}>{props.iconFooter}</i>
          <p>{props.titleFooter}</p>
        </div>
      </div>
    </div>
  )
}