import React, { useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import Slider from "react-slick";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loadding from '../Loadding/Loadding';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';

export default function ProductDetails() {
  let{addProductToCart}=useContext(CartContext)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000
  };





  const [Product, setProduct] = useState(null)
  const [Loading, setLoading] = useState(true)
  let{id}=useParams();
  async function getproduct(productId) {
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
    console.log(data);
    setProduct(data.data);
    setLoading(false);

    
    
  }
  useEffect(()=>{
    getproduct(id)


  },[])
  return <>
    <h2>ProductDetails</h2>
    {Loading?<Loadding/>:
    <div className="flex p-8 items-center">
      <div className="w-1/4">
      <Slider {...settings}>
        {Product.images.map((img ,index)=><img key={index} src={img} className='w-full' alt={Product.title}/>)}
    
        
    </Slider>
      
      </div>
      <div className="w-3/4 ps-4">

      <h2>{Product.title}</h2>

      <p className='m-2 text-gray-600'>{Product.description}</p>
      <p className=' '>{Product.category.name}</p>
      <div className="flex justify-between">
        <span>{Product.price} EGP</span>
        <span> <i className='fas fa-star rating-color  '></i>{Product.ratingsAverage}</span>


      </div>
      <button onClick={()=>addProductToCart(Product.id)} className='btn w-full'>Add To Cart</button>
      
      </div>
    </div>
    
    }
  
  </>
}
