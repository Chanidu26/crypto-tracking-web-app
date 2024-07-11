import React from 'react'
import './Coin.css'
const Coin = ({id,name,image,symbol,price}) => {
    return (
      <div className='coin' id={id}>
        <img src={image} alt={name} />
        <h1>{name}</h1>
        <p>{symbol}</p>
        <p>${price}</p>
      </div>
    )
  }

export default Coin