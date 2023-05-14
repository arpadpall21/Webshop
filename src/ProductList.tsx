import styles from './ProductList.module.scss';
import { Product } from './helper/types';


function ProductList(props: { product: Product }) {
  const { title, description, discountPercentage, price, thumbnail, id } = props.product;
  const viewWidth = window.innerWidth;      // adapt screen size (responsive desktop design)
  const productUrl = window.location.origin + `/product/${id}`;

  return (
    <div className={styles['product-list-container']} style={{ width: (viewWidth / 100) * 23 }}>
      <div>
        <div className={styles['thumbnail-container']}>
          <span className={styles['discount-percentage']}> {-discountPercentage} % </span>
          <img className={styles['thumbnail']} src={thumbnail} alt='product thumbnail'></img>
        </div>
        <div className={styles['product-title']}> 
          <span>{price} $</span>
          <p style={{ width: (viewWidth / 100) * 16 }} title={title}> {title} </p>
        </div>
        <div className={styles['description']}>
          {description}
        </div>
        <a href= {productUrl} className={styles['details-button']}> See details </a>
      </div>
    </div>
  )
}

export default ProductList;
