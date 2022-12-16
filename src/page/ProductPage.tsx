import { useParams } from "react-router-dom";
import { useFetchProduct } from '../hook/fetch';
import './ProductPageStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";

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

  const { images, title, description, price, discountPercentage, rating, stock, brand, category } = product

  return (
    <div className='productContainer'>
      <div className='slideShow'>

      </div>
      <div className='content'>
        <div className='titleContainer'>
          <div title={title}> {title} </div>
          <div> {computeRatingVisual(rating)} </div>
        </div>
        <p className='desc'> {description} </p>
        <p className='stockBrandCat'> Stock: {stock} </p>
        <p className='stockBrandCat'> Brand: {brand} </p>
        <p className='stockBrandCat'> Category: {category} </p>
        <p className='dicountPercent'><span> {-discountPercentage} % </span></p>
        <div className='priceAddCart'>
          <div> {price}$ </div>
          <div> Add to cart </div>
        </div>
      </div>
    </div>
  )
}

function computeRatingVisual(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (Math.floor(rating) <= i) {
      stars.push(<FontAwesomeIcon style={{ color: '#6100ff' }} icon={faStar} />)
      continue;
    }

    stars.push(<FontAwesomeIcon style={{ color: 'gray' }} icon={faStar} />)
  }

  return (
    <span>
      {stars} &nbsp;{rating}
    </span>
  )
}
