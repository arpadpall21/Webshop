import { useState } from 'react';
import './App.css';
import { useFetchProducts } from './hook/fetch';
import { Product } from './helper/types';
import { ProductComponent } from './component/Product';


function App() {
  let [nrOfProducts, setNrOfProducts] = useState(0);
  const [products, setProductList] = useState<Product[]>([])
  const { loading, errorMsg, productList, total } = useFetchProducts(nrOfProducts)

  console.log( productList )
  // setNrOfProducts(nrOfProducts += 10)

  return (
    <div className="App">
      <h1> See Products </h1>
      <ProductComponent product={productList[0]}/>
      <p> TEST </p>
    </div>
  );
}

export default App;