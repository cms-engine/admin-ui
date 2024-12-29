import React from 'react'
import Card from './Card'

const CardContainer: React.FC = () => {
  return (
    <div className='card-container'>
      <Card title='Primary Card' type='primary'></Card>
      <Card title='Warning Card' type='warning'></Card>
      <Card title='Success Card' type='success'></Card>
      <Card title='Danger Card' type='danger'></Card>
    </div>
  )
}

export default CardContainer
