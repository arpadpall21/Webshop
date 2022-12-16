import { useState, useRef, useCallback, useEffect } from 'react';
import { useFetchProductList } from './hook/fetch';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ProductListComponent from './component/ProductList';
import ProductPage from './page/ProductPage';


export default function App() {
  console.count( '---rendered---')

  let [nrOfProducts, setNrOfProducts] = useState(0);
  const { loading, error, productList } = useFetchProductList(nrOfProducts)
  const controlElement = useRef(null);

  const handleControlElement = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting) {
      setNrOfProducts(nrOfProducts += 10);
    }
  }, [])

  useEffect(() => {
    const option = { root: null, rootMargin: '500px', threshold: 1 };
    const observer = new IntersectionObserver(handleControlElement, option);

    if (controlElement.current) {
      observer.observe(controlElement.current);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <div className="App">
            <h1> See Products </h1>
            <div className='productGrid'>
              {productList.map(p => <ProductListComponent key={p.id} product={p} />)}
            </div>
            <div ref={controlElement} />
            {loading && <p className='loadingErrorMsg'> Loading...</p>}
            {error && <p className='loadingErrorMsg'> Loading Error! </p>}
          </div>
        } />
        <Route path='/product/:id' element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}
