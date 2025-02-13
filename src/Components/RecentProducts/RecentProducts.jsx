

import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'

import { Link } from 'react-router-dom'
import Loadding from '../Loadding/Loadding'
import { CartContext } from '../../Context/CartContext'

import { useQuery } from '@tanstack/react-query'
import { useGetCart } from '../../Hooks/useGetCart'
import { useGetWishList } from '../../Hooks/useGetWishList'
import toast from 'react-hot-toast'
import { Wishlistcontext } from '../../Context/WishlistContext'




export default function RecentProducts() {
  let{AddToWishlist}=useContext(Wishlistcontext)

  const [isAdding, setIsAdding] = useState(false)
  const{refetch}=useGetCart()
  const { refetch: refetchWishList,data } = useGetWishList();
  


  const [Products, setProducts] = useState([])
  const [Loading, setLoading] = useState(true)
  let{addProductToCart}=useContext(CartContext);


  async function getProducts() {
    let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    console.log(data);
    setProducts(data.data);
    setLoading(false)
    
    
  }
  useEffect(()=>{
    getProducts()

  },[])

  const handleAddToWishList = async () => {
    setIsAdding(true);
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishList`,
        {
          productId:id,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      toast.success(response.data.message);
      console.log(data);
    refetchWishList();
      console.log(data);
    } catch (error) {
     toast.error(
        "Error: Unable to add the product to your wishList. Please try again later."
      );
      console.error("Error adding to wishList:", error);
    } finally {
     setIsAdding(false);
    }
  };


 
  
  return <>  
    
  {Loading? <Loadding/>:
  <div className="flex flex-wrap py-8 gap-y-4 justify-center px-9">
    {Products.map( (product)=><div key={product.id} className="w-1/6">
   
   <div className="product p-2 rounded-lg">
   <Link to={`productdetails/${product.id}`}>
      <img src={product.imageCover} className='w-full' alt={product.title} />
      <h3 className='text-green-500'>{product.category.name}</h3>
      <h3 className='text-xl' >{product.title.split(' ',2).join(' ')}</h3>
      <div className="flex justify-between">
        <span>{product.price} EGP</span>
        <span> <i className='fas fa-star rating-color  '></i>{product.ratingsAverage}</span>
       
       

      </div>
      </Link>
      

      
      <button onClick={()=>AddToWishlist(product.id)}> <i className="fa-solid fa-heart fa-xl "></i></button>
      <button onClick={()=>addProductToCart(product.id)} className='btn w-full'>Add To Cart</button>
    </div>

   
   
   
    
    </div> )}
  </div>
  
  }
  
  </>
}