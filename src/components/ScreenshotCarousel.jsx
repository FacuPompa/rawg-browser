import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ScreenshotCarousel = ({ screenshots }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} absolute top-1/2 -translate-y-1/2 right-0 z-10 cursor-pointer`}
        style={{ ...style, display: "block", color: "white" }}
        onClick={onClick}
        aria-label="Next Slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} absolute top-1/2 -translate-y-1/2 left-0 z-10 cursor-pointer`}
        style={{ ...style, display: "block", color: "white" }}
        onClick={onClick}
        aria-label="Previous Slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden my-4">
      <Slider {...settings} ref={sliderRef}>
        {screenshots.map((screenshot, index) => (
          <div key={screenshot.id} className="px-2">
            <div onClick={(e) => e.preventDefault()}>
              <img
                src={screenshot.image}
                alt={`Screenshot ${index + 1}`}
                className={`w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300
                            ${index === currentSlide ? 'scale-110 hover:scale-125' : 'scale-90 opacity-70 hover:opacity-100'}`}
                style={{ pointerEvents: 'none' }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ScreenshotCarousel;