import { useState } from 'react';
import './App.css';
import { useFetchProducts } from './hook/fetch';
import { Product } from './helper/types';
import { ProductComponent } from './component/Product';


function App() {
  let [nrOfProducts, setNrOfProducts] = useState(0);
  const [productListState, setProductListState] = useState<Product[]>([])
  const { loading, errorMsg, productList, total } = useFetchProducts(nrOfProducts)

  // setProductListState(productList)

  console.log(productList)
  // setNrOfProducts(nrOfProducts += 10)

  const products = productList.map( p => <ProductComponent product={p} /> );




  return (
    <div className="App">
      <h1> See Products </h1>
      <div className='productGrid'>
        {products}
      </div>
    </div>
  );
}

export default App;