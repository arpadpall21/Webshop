import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from './store/slice/cartSlice';

function ProductCard(props: { product: Product }) {
  const { title, description, discountPercentage, price, thumbnail, id } = props.product;

  return (
    <div className={styles['product-card-container']}>
      <div className={styles['thumbnail-container']}>
        <span className={styles['discount-percentage']}> {-discountPercentage} % </span>
        <img className={styles['thumbnail']} src={thumbnail} alt='product thumbnail'></img>
      </div>
      <div className={styles['title']}> 
        <span>{price} $</span>
        <p title={title}> {title} </p>
      </div>
      <div className={styles['description']}>
        {description}
      </div>
      <Link className={styles['details-button']} to={`/product/${id}`}> Details </Link>
    </div>
  )
}

export default ProductCard;
