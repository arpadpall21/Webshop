import { useState } from 'react';
import styles from './CartPage.module.scss';
import { getSessionCartContent } from './store';
import { useSelectedProducts } from './hook/fetch';
import { store, alterCartContent } from './store';
import { Product } from './helper/types';

function CartPage(): any {
  const [productListState, setProductListState] = useState<Product[]>([]);
  const { loading, error, productList } = useSelectedProducts(getSessionCartContent(), productListState);

  const removeProductFromCartHandler = (e: any, productId: number) => {
    store.dispatch(alterCartContent({ actionName: 'removeProductFromCart', productId }));

    for (let i = 0; i < productList.length; i++) {
      if (productList[i].id === productId) {
        productList.splice(i, 1);
      }
    }
    setProductListState(productList);
  }

  if (loading) {
    return <p className={styles['error-loading-msg']}> Loading... </p>
  }

  if (error) {
    return <p className={styles['error-loading-msg']}> Loading Error! </p>
  }

  let totalPrice = 0;
  return (
    <div className={styles['cart-container']}>
      {productList.map((product, idx) => {
        totalPrice += product.price;
        return <div className={styles['cart-product']} key={idx}>
          <img src={product.thumbnail} alt={product.thumbnail}></img>
          <span className={styles['cart-product-title']}>{product.title} </span>
          <span className={styles['cart-product-price']}>{product.price}$</span>
          <span className={styles['remove-product-button']} onClick={e => removeProductFromCartHandler(e, product.id)}> Remove </span>
        </div>
      })}
      <div className={styles['total-price']}> Total: {totalPrice}$ </div>
    </div>
  )
}

export default CartPage;
