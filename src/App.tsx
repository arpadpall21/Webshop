import { useState, useRef, useCallback, useEffect } from 'react';
import './App.css';
import { useFetchProducts } from './hook/fetch';
import { ProductComponent } from './component/Product';


function App() {
  console.count('-------rerendered ----------');





  let [nrOfProducts, setNrOfProducts] = useState(0);
  const { loading, errorMsg, productList, totalProducts } = useFetchProducts(nrOfProducts)
  const controlElement = useRef(null);

  const handleControlElement = useCallback((entries: any) => {
    const target = entries[0];

    if (target.isIntersecting) {
      setNrOfProducts(nrOfProducts += 10);
    }
  }, [])

  useEffect(() => {
    const option = { root: null, rootMargin: '20px', threshold: 0 };
    const observer = new IntersectionObserver(handleControlElement, option);

    if (controlElement.current) {
      observer.observe(controlElement.current);
    }
  }, []);

  return (
    <div className="App">
      <h1> See Products </h1>
      <div className='productGrid'>
        {productList.map(p => <ProductComponent key={p.id} product={p} />)}
      </div>
      <div ref={controlElement} />
      {loading && <p className='loadingErrorMsg'> Loading...</p>}
      {errorMsg && <p className='loadingErrorMsg'> {errorMsg} </p>}
    </div>
  );
}

export default App;

function setPage(arg0: (prev: any) => any) {
  throw new Error('Function not implemented.');
}
