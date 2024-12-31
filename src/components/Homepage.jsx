import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import image from '../images/portfolio-7.jpg'
import './main.css'
import Navbartop from './Navbartop';
import HomeNavBar from './HomeNavBar';
import { toast } from 'react-toastify';

export default function Homepage() {

  const quotesToRead=()=>{

    toast.warning("Read...Learn... And Grow..")
  }
  return (
    <>
   <HomeNavBar/>
    <div className='container-home'><div>


    <Carousel>
      <Carousel.Item interval={2500}>
       <img className="carousel-image" src={image} alt="image" />
       
      </Carousel.Item>
      <Carousel.Item interval={1000}>
       <img className="carousel-image" src={image} alt="image" />
       
      </Carousel.Item>
      <Carousel.Item interval={1000}>
       <img className="carousel-image" src={image} alt="image" />
       
      </Carousel.Item>
    </Carousel>
    </div>
    <div>
      <div>
        <h3 className='main-quote' onClick={quotesToRead}>Read, Dream, Repeat...</h3></div></div></div>
        </>
  );
}

      

