import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import SlideShow from "./SlideShow";
import styles from './ProductPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useFetchProductQuery } from "./store/slice/productApiSlice";
import { addProductToCart, removeProductFromCart, cartHasProduct } from './store/slice/cartSlice';


function ProductPage() {
  const dispatch = useDispatch();
  const productId = Number(useParams().id);
  const { isLoading, isError, data: product } = useFetchProductQuery(productId);
  const [cartHasThisProduct, setCartHasThisProduct] = useState(cartHasProduct(product));
  const addProductButtonBackgroundColor = cartHasThisProduct ? 'lightCoral' : 'seaGreen';

  if (isLoading) {
    return <p className={styles['error-msg']}> Loading... </p>
  }

  if (isError) {
    return <p className={styles['error-msg']}> Loading Error! </p>
  }

  const productInCartHandler = () => {
    if (cartHasThisProduct) {
      dispatch(removeProductFromCart(product));
      setCartHasThisProduct(false);
      return;
    }

    dispatch(addProductToCart(product));
    setCartHasThisProduct(true);
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
            <div
              style={{backgroundColor: addProductButtonBackgroundColor}}
              onClick={productInCartHandler}
            >
              {cartHasThisProduct ? 'Remove from cart' : 'Add to cart'}
            </div>
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
