import { useEffect, useRef } from 'react';
import styles from './SlideShow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import { Url } from './store/slice/cartSlice';

type Direction = 'left' | 'right';

let sliderDirection: Direction = 'right';
let autoSliderOn = true;


function SlideShow(props: { images: Url[] }) {
  const slider = useRef<HTMLDivElement>(null);
  const dotPosIndicator = useRef<HTMLSpanElement>(null);
  const nrOfImages = props.images.length;

  const moveSlider = (direction: Direction, autoSlide: boolean = true): boolean => {
    if (!autoSlide) {         // disalbe auto slider once the user start sliding
      autoSliderOn = false;
    }

    if (slider.current && dotPosIndicator.current) {
      const sliderPosition = slider.current.style.marginLeft ? Number.parseInt(slider.current.style.marginLeft) : 0;
      const dotMapPosition = dotPosIndicator.current.style.left ? Number.parseInt(dotPosIndicator.current.style.left) : 2;

      // console.log(sliderPosition);
      // console.log(dotMapPosition);
      // console.log(direction)

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
    }
    return false;     // slider cannot move in the intended direction
  }

  const sliderHandler = (e: React.MouseEvent<HTMLDivElement>, direction: Direction): void => {
    moveSlider(direction, false);
  }

  useEffect(() => {
    console.log('use effect triggered')
    setInterval(() => {
      console.log(1)
      if (!autoSliderOn) {
        return;
      }

      if (!moveSlider(sliderDirection)) {
        moveSlider(alterSliderDirection(sliderDirection));
      }
    }, 4000);
  })

  return (
    <div className={styles['slide-show-container']}>
      <div className={styles['arrow-left']} onClick={e => sliderHandler(e, 'left')}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div className={styles['slider']}>
        <div 
          className={styles['slider-grid']} 
          ref={slider}
          style={{ width: `${props.images.length * 40}vw` }}
        >
          { props.images.map((img, i) =>
            <div className={styles['frame']} key={i}>
              <img key={i} src={img} alt={img} />
            </div>
          ) }
        </div>
      </div>
      <div className={styles['arrow-right']} onClick={e => sliderHandler(e, 'right')}>
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
    dots.push(<FontAwesomeIcon key={i} style={{ color: 'gray' }} icon={faCircle} />, '    ');
  }

  return dots
}

function alterSliderDirection(direction: Direction): Direction {
  if (direction === 'left') {
    return sliderDirection = 'right';
  }

  return sliderDirection = 'left';
}

export default SlideShow;
