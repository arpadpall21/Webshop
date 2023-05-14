import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { selectCart, removeProductFromCart, Product } from './store/slice/cartSlice';

function CartPage(): any {
  const dispatch = useDispatch();
  const cartList = useSelector(selectCart);

  const removeProductFromCartHandler = (e: React.MouseEvent<HTMLSpanElement>, product: Product): void => {
    dispatch(removeProductFromCart(product));
  }

  let totalPrice = 0;
  return (
    <div className={styles['cart-container']}>
      {Object.keys(cartList).map((productId) => {
        const product = cartList[productId];
        totalPrice += product.price;

        return (
          <div className={styles['cart-product']} key={product.id}>
            <img src={product.thumbnail} alt={product.thumbnail} />
            <Link
              className={styles['cart-product-title']}
              to={`/product/${productId}`}
            >
              {product.title}
            </Link>
            <span className={styles['cart-product-price']}> {product.price}$ </span>
            <span
              className={styles['remove-product-button']}
              onClick={e => removeProductFromCartHandler(e, product)}
            >
              Remove
            </span>
          </div>
        )
      })}
      <div className={styles['total-price']}> Total: {totalPrice}$ </div>
    </div>
  )
}

export default CartPage;
