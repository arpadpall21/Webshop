import { useParams } from "react-router-dom";
import { useFetchProduct } from './hook/fetch';
import SlideShow from "./SlideShow";
import styles from './ProductPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { store, alterCartContent, getSessionCartContent } from './store';


function ProductPage(): any {
  const productId = Number(useParams().id);
  const { loading, error, product } = useFetchProduct(productId);

  const addProductToCartHandler = () => {
    store.dispatch(alterCartContent({ actionName: 'addProductToCart', productId }));
  }

  if (loading) {
    return    // waiting untill request finishes
  }

  if (error) {
    return <p className={styles['error-msg']}> Loading Error! </p>
  }

  const { images, title, description, price, discountPercentage, rating, stock, brand, category } = product

  return (
    <div className={styles['product-container-outer']}>
      <div className={styles['product-container']}>
        <SlideShow images={images} />
        <div className={styles['content']}>
          <div className={styles['title-container']}>
            <div title={title}> {title} </div>
            <div> {computeRatingVisual(rating)} </div>
          </div>
          <p className={styles['desc']}> {description} </p>
          <p className={styles['stock-brand-cat']}> Stock: {stock} </p>
          <p className={styles['stock-brand-cat']}> Brand: {brand} </p>
          <p className={styles['stock-brand-cat']}> Category: {category} </p>
          <p className={styles['dicount-percent']}><span> {-discountPercentage} % </span></p>
          <div className={styles['price-add-cart']}>
            <div> {price}$ </div>
            <div onClick={addProductToCartHandler}> Add to cart </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function computeRatingVisual(rating: number) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (Math.floor(rating) > i) {
      stars.push(<FontAwesomeIcon key={i} style={{ color: '#6100ff' }} icon={faStar} />)
      continue;
    }

    stars.push(<FontAwesomeIcon key={i} style={{ color: 'gray' }} icon={faStar} />)
  }

  return <span> {stars} &nbsp;{rating} </span>
}

export default ProductPage;
