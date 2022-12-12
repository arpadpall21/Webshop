import React from 'react';
import './Product.css'
import { Product } from '../helper/types';


export function ProductComponent(prop: { product: Product }) {
  const { title, description, discountPercentage, price, thumbnail } = prop.product;

  return (
    <div className='productContainer'>
      <div>
        <div className="thumbnailContainer">
          <span className='discountPercentage'> {-discountPercentage} % </span>
          <img className='thumbnail' src={thumbnail} alt='product thumbnail'></img>
        </div>
        <p className="productTitle"> {title} <span>{price} $</span> </p>
        <p className="description"> {description} </p>
        <p className="detailsButton"> See details </p>
        <br />
      </div>
    </div>
  )
}
