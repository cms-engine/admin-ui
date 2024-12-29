import React from 'react'

type CardProps = {
  title: string
  type: 'primary' | 'warning' | 'danger' | 'success'
}

const Card: React.FC<CardProps> = ({ title, type }) => {
  return (
    <div className={`card card-${type}`}>
      <div className='card-body'>
        <h5>{title}</h5>
        <a href='#' className='btn btn-light btn-sm'>
          View details
        </a>
      </div>
    </div>
  )
}

export default Card
