import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './ProductListPage.module.scss';
import ProductList from './ProductCard';
import { Product } from './store/slice/cartSlice';
import { useFetchProductListQuery } from './store/slice/productApiSlice';


function ProductListPage() {
  let [nrOfProductsToFetch, setNrOfProductsToFetch] = useState(10);
  const { isLoading, isError, data } = useFetchProductListQuery(nrOfProductsToFetch);
  const controlElement = useRef<HTMLDivElement>(null);

  const handleControlElement = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting) {
      setNrOfProductsToFetch(nrOfProductsToFetch += 10);
    }
  }, []);

  useEffect(() => {
    const option = { root: null, rootMargin: '700px', threshold: 1 };
    const observer = new IntersectionObserver(handleControlElement, option);

    if (controlElement.current) {
      observer.observe(controlElement.current);
    }
  }, [handleControlElement]);

  return (
    <div className={styles['app']}>
      <div className={styles['product-grid']}>
        {data && data.products && data.products.map((p: Product) => <ProductList key={p.id} product={p} />)}
      </div>
      <div ref={controlElement} />
      {isLoading && <p className={styles['loading-error-msg']}> Loading... </p>}
      {isError && <p className={styles['loading-error-msg']}> Loading Error! </p>}
    </div>
  )
}

export default ProductListPage;
