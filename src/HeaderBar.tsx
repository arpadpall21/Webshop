import './css/HeaderBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";


export default function HeaderBar(props: { nrOfProductsInCart: number }) {
  const prodCountBgc = props.nrOfProductsInCart > 0 ? 'green' : 'white';

  return (
    <div className='headerBar'>
      <a className='shopName' href={window.location.origin}> Demo Shop </a>
      <span className='cart'>
        <FontAwesomeIcon icon={faCartShopping} />
        <span style={{ backgroundColor: prodCountBgc }}> {props.nrOfProductsInCart} </span>
      </span>
    </div>
  )
}
