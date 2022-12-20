import { useEffect, useRef } from 'react';
import './css/SlideShow.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faCircle } from "@fortawesome/free-solid-svg-icons";


let autoSliderDirection = 'right';
let autoSliderOn = true;

export default function SlideShow(props: { images: string[] }) {
  const slider = useRef() as any;
  const dotPosIndicator = useRef() as any;
  const nrOfImages = props.images.length;

  const moveSlider = (e: any, direction: string): boolean => {
    if (e !== 'e') {      // disalbe auto slider once the user start sliding
      autoSliderOn = false;
    }

    const sliderPosition = slider.current.style.marginLeft ? parseInt(slider.current.style.marginLeft) : 0;
    const dotMapPosition = dotPosIndicator.current.style.left ? parseInt(dotPosIndicator.current.style.left) : 0;

    if (direction === 'left' && sliderPosition < 0) {                           // slider moves right (if possible)
      slider.current.style.marginLeft = `${sliderPosition + 100}%`
      dotPosIndicator.current.style.left = `${dotMapPosition - 30}px`;
      return true;
    }
    if (direction === 'right' && sliderPosition > (-nrOfImages * 100) + 100) {  // slider moves left (if possible)
      slider.current.style.marginLeft = `${sliderPosition - 100}%`
      dotPosIndicator.current.style.left = `${dotMapPosition + 30}px`;
      return true;
    }

    return false;     // slider cannot move in the intended direction
  }

  useEffect(() => {
    setInterval(() => {
      if (!autoSliderOn) {
        return;
      }

      if (!moveSlider('e', autoSliderDirection)) {
        moveSlider('e', alterSliderDirection(autoSliderDirection));
      }
    }, 4000);
  }, [])

  return (
    <div className='slideShowContainer'>
      <div className='arrowLeft' onClick={e => moveSlider(e, 'left')}><FontAwesomeIcon icon={faChevronLeft} /></div>
      <div className='slider'>
        <div className='sliderGrid' ref={slider} style={{ width: `${props.images.length * 40}vw` }}>{props.images.map((img, idx) =>
          <div className='frame' key={idx}><img key={idx} src={img}></img></div>
        )}</div>
      </div>
      <div className='arrowRight' onClick={e => moveSlider(e, 'right')}><FontAwesomeIcon icon={faChevronRight} /></div>
      <div className='dotMap'>
        <span>
          {computeDotMap(nrOfImages)}
          <span className='currentDotPostion' ref={dotPosIndicator}><FontAwesomeIcon style={{ color: '#6100ff' }} icon={faCircle} /></span>
        </span></div>
    </div>
  )
}

function computeDotMap(nrOfImages: number) {
  const dots = [];
  for (let i = 0; i < nrOfImages; i++) {
    dots.push(<FontAwesomeIcon key={i} style={{ color: 'gray' }} icon={faCircle} />, '     ');
  }

  return dots
}

function alterSliderDirection(direction: string): string {
  if (direction === 'left') {
    autoSliderDirection = 'right';
    return 'right'
  } else {
    autoSliderDirection = 'left';
    return 'left'
  }
}
