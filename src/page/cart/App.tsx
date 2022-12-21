import { useState } from 'react';
import './css/App.css';
import { getSessionCartContent } from '../../store';
import { useSelectedProducts } from '../../hook/fetch';
import { store, alterCartContent } from '../../store';
import { Product } from '../../helper/types';


export default function CartPage(): any {
  const [productListState, setProductListState] = useState<Product[]>([]);
  const { loading, error, productList } = useSelectedProducts(getSessionCartContent(), productListState);

  const removeProductFromCartHandler = (e: any, productId: number) => {
    store.dispatch(alterCartContent({ actionName: 'removeProductFromCart', productId }));

    for (let i = 0; i < productList.length; i++) {
      if (productList[i].id === productId) {
        productList.splice(i, 1);
      }
    }
    setProductListState(productList);
  }

  if (loading) {
    return <p className='errorLoadingMsg'> Loading... </p>
  }

  if (error) {
    return <p className='errorLoadingMsg'> Loading Error! </p>
  }

  let totalPrice = 0;
  return (
    <div className='cartContainer'>
      {productList.map((product, idx) => {
        totalPrice += product.price;
        return <div className='cartProduct' key={idx}>
          <img src={product.thumbnail} alt={product.thumbnail}></img>
          <span className='cartProductTitle'>{product.title} </span>
          <span className='cartProductPrice'>{product.price}$</span>
          <span className='removeProductButton' onClick={e => removeProductFromCartHandler(e, product.id)}> Remove </span>
        </div>
      })}
      <div className='totalPrice'> Total: {totalPrice}$ </div>
    </div>
  )
}
