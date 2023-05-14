import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';


function ProductList(props) {
  const { title, description, discountPercentage, price, thumbnail, id } = props.product;
  const viewWidth = window.innerWidth;      // adapt screen size (responsive desktop design)

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
        <Link className={styles['details-button']} to={`/product/${id}`}> Details </Link>
      </div>
    </div>
  )
}

export default ProductList;
