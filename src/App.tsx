import { useState, useRef, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/App.css';
import ProductList from './ProductList';
import HeaderBar from './HeaderBar';
import ProductPage from './page/product/App';
import { useFetchProductList } from './hook/fetch';
import { store } from './store';


export default function App() {
  let [nrProductsToFetch, setNrOfProducts] = useState(0);
  const [nrOfProductsInCart, setNrOfProductsInCart] = useState(store.getState().cartProducts.length)
  
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
  }, [])

  return (
    <div>
      <HeaderBar nrOfProductsInCart={nrOfProductsInCart} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <div className="App">
              <div className='productGrid'>
                {productList.map(p => <ProductList key={p.id} product={p} />)}
              </div>
              <div ref={controlElement} />
              {loading && <p className='loadingErrorMsg'> Loading...</p>}
              {error && <p className='loadingErrorMsg'> Loading Error! </p>}
            </div>
          } />
          <Route path='/product/:id' element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}




/*
- top header where we have the back to the product page and the cart (in all pages)
  


*/