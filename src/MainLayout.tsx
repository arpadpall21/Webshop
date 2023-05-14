import { useSelector } from 'react-redux';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import styles from './MainLayout.module.scss';
import { selectCart } from './store/slice/cartSlice';

function MainLayout() {
  const cart = useSelector(selectCart);
  const location = useLocation()

  const homeButtonVisibility = location.pathname === '/' ? 'hidden' : 'visible';
  const toCartButtonVisibility = location.pathname === '/cart' ? 'hidden' : 'visible';
  const nrOfProductsInCart = Object.keys(cart).length;
  const productCountBackgroundColor = nrOfProductsInCart > 0 ? 'seaGreen' : '#ebebeb';

  return (
    <>
      <header>
        <Link 
          className={styles['home-button']}
          to='/'
          style={{visibility: homeButtonVisibility}}
        >
          &#8592; To Shop
        </Link>
        <Link className={styles['shop-name']} to='/'> Demo Shop </Link>
        <Link className={styles['cart']} to='/cart'>
          <FontAwesomeIcon icon={faCartShopping} />
          <span
            className={styles['product-in-cart-counter']}
            style={{ backgroundColor: productCountBackgroundColor }}
          >
            {nrOfProductsInCart}
          </span>
        </Link>
        <Link 
          className={styles['to-cart-button']}
          to='/cart'
          style={{visibility: toCartButtonVisibility}}
        >
          To Shopping Cart &#8594;
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout;
