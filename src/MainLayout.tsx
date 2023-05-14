import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import styles from './MainLayout.module.scss';

const origin = window.location.origin;

function MainLayout() {
  const nrOfProductsInCart = 0;
  const productCountBackgroundColor = nrOfProductsInCart > 0 ? 'green' : 'white';

  return (
    <>
      <header>
        <a className={styles['shop-name']} href={origin}> Demo Shop </a>
        <a className={styles['cart']} href={origin + '/cart'}>
          Go to shopping cart
          <FontAwesomeIcon icon={faCartShopping} />
          <span style={{ backgroundColor: productCountBackgroundColor }}> {nrOfProductsInCart} </span>
        </a>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout;