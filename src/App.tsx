import { useState, useCallback } from 'react';
import './App.css';
import { Product } from './Product';
import { useFetchProducts } from './hook/fetch';

function App() {
  let [nrOfProducts, setNrOfProducts] = useState(0);
  const { loading, errorMsg, productList, totalProducts } = useFetchProducts(nrOfProducts)

  console.log( productList )
  // setNrOfProducts(nrOfProducts += 10)

  return (
    <div className="App">
      <h1> See Products </h1>
      <Product />
      <p> TEST </p>
    </div>
  );
}

export default App;