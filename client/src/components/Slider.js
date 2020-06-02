import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide1 from '../assets/images/slide-1-01.jpg';
import slide2 from '../assets/images/slide-2-01.jpg';
// import './puja-style.css';

class SliderApp extends Component {
  render () {
    const settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed:5000
    };
    return (
      <div className="slick-container">
        <Slider {...settings}>
          <div><img src={slide1} alt="Credit to Joshua Earle on Unsplash"/></div>
          <div><img src={slide2} alt="Credit to Alisa Anton on Unsplash"/></div>
        </Slider>
      </div>
    );
  }
}

export default SliderApp;