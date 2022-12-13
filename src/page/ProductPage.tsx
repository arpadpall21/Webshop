import { useParams } from "react-router-dom";
import { useFetchProduct } from '../hook/fetch';
import './ProductPage.css';

export default function ProductPage() {
  console.log('ProductPage rerendered -------------------')


  const productId = Number(useParams().id);
  const { loading, error, product } = useFetchProduct(productId);

  if (loading) {
    return <p className='loadingErrorMsg'> Loading... </p>
  }

  if (error) {
    return <p className='loadingErrorMsg'> Loading Error! </p>
  }

  const { images, title, description, price, discountPercentage, rating, stock, brand, category, id } = product

  return (
    <div>
      <p> {title} </p>
      <p> {description} </p>
      <p> {price} </p>
      <p> {discountPercentage} </p> 
      <p> {rating} </p>
      <p> {stock} </p>
      <p> {brand} </p>
      <p> {category} </p>
      <p> {id} </p>
    </div>
  )
}