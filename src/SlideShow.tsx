import { useEffect, useRef } from 'react';
import styles from './SlideShow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faCircle } from "@fortawesome/free-solid-svg-icons";


let autoSliderDirection = 'right';
let autoSliderOn = true;

function SlideShow(props: { images: string[] }) {
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
    <div className={styles['slide-show-container']}>
      <div className={styles['arrow-left']} onClick={e => moveSlider(e, 'left')}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div className={styles['slider']}>
        <div 
          className={styles['slider-grid']} 
          ref={slider} 
          style={{ width: `${props.images.length * 40}vw` }}
        >
          { props.images.map((img, idx) =>
            <div className={styles['frame']} key={idx}>
              <img key={idx} src={img} />
            </div>
          ) }
        </div>
      </div>
      <div className={styles['arrow-right']} onClick={e => moveSlider(e, 'right')}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <div className={styles['dot-map']}>
        <span> {computeDotMap(nrOfImages)}
          <span className={styles['current-dot-postion']} ref={dotPosIndicator}>
            <FontAwesomeIcon style={{ color: '#6100ff' }} icon={faCircle} />
          </span>
        </span>
      </div>
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

export default SlideShow;
