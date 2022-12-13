import React from 'react';
import './Product.css'
import { Product } from '../helper/types';


export function ProductComponent(prop: { product: Product }) {
  const { title, description, discountPercentage, price, thumbnail } = prop.product;
  const viewWidth = window.innerWidth;      // to addapt product container to view size on render  

  return (
    <div className='productContainer' style={{ width: (viewWidth / 100) * 23 }}>
      <div>
        <div className="thumbnailContainer">
          <span className='discountPercentage'> {-discountPercentage} % </span>
          <img className='thumbnail' src={thumbnail} alt='product thumbnail'></img>
        </div>
        <div className="productTitle"> 
          <span>{price} $</span>
          <p style={{ width: (viewWidth / 100) * 16 }} title={title}> {title} </p>
        </div>
        <div className="description">
          {description}
        </div>
        <p className="detailsButton"> See details </p>
      </div>
    </div>
  )
}
