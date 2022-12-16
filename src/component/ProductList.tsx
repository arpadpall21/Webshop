import './ProductList.css'
import { Product } from '../helper/types';


export default function ProductListComponent(prop: { product: Product }) {
  const { title, description, discountPercentage, price, thumbnail, id } = prop.product;
  const viewWidth = window.innerWidth;      // adapt screen size (responsive desktop design)
  const productUrl = window.location.origin + `/product/${id}`;

  return (
    <div className='productListContainer' style={{ width: (viewWidth / 100) * 23 }}>
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
        <a href= {productUrl} className="detailsButton"> See details </a>
      </div>
    </div>
  )
}
