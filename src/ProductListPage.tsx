import { useState, useRef, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from './ProductListPage.module.scss';
import ProductList from './ProductList';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import { useFetchProductList } from './hook/fetch';
import { store, getSessionCartContent } from './store';


import { useFetchProductQuery, useFetchProductListQuery } from './store/slice/productApiSlice';



function ProductListPage() {
  // console.log( useFetchProductQuery(1) )
  console.log( useFetchProductListQuery(99) )


  let [nrProductsToFetch, setNrOfProducts] = useState(0);
  const [nrOfProductsInCart, setNrOfProductsInCart] = useState(getSessionCartContent().length);

  store.subscribe(() => {
    setNrOfProductsInCart(getSessionCartContent().length);
  })

  const { loading, error, productList } = useFetchProductList(nrProductsToFetch)
  const controlElement = useRef(null);

  const handleControlElement = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting) {
      setNrOfProducts(nrProductsToFetch += 10);
    }
  }, [])

  useEffect(() => {
    const option = { root: null, rootMargin: '500px', threshold: 1 };
    const observer = new IntersectionObserver(handleControlElement, option);

    if (controlElement.current) {
      observer.observe(controlElement.current);
    }
  }, [handleControlElement])

  return (
    <div className={styles['app']}>
      <div className={styles['product-grid']}>
        {productList.map(p => <ProductList key={p.id} product={p} />)}
      </div>
      <div ref={controlElement} />
      {loading && <p className={styles['loading-error-msg']}> Loading...</p>}
      {error && <p className={styles['loading-error-msg']}> Loading Error! </p>}
    </div>
  )
}

export default ProductListPage;
