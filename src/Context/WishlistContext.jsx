import axios from 'axios';
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast';
export let Wishlistcontext=createContext();
export default function WishlistcontextProvider({children}){
    const[Wishlist,setWishlist]=useState(null);
    const[Loading,setLoading]=useState(true);
    const headers ={
        token:localStorage.getItem('usertoken')
    }
    async function AddToWishlist(productId) {
        try{
            let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{headers})
            console.log(data);
            setWishlist(data)
            toast.success("Added to Wishlist Sucessfully")
            
        }catch(error){
            console.log(error);
            toast.error("You must login first")
            

        }
        
    }



    async function getWishlist() {
        try{
            let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
            setWishlist(data)
            setLoading(false)
        }catch(error){
            toast.error('you must login first')
        }
        
    }

    async function deleteProduct(id) {
        try{
            let response=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
            let{data}=await getWishlist();
            setWishlist(data)

        }catch(error){
            console.log(error);
            

        }

     
        
    }




  return <Wishlistcontext.Provider value={{AddToWishlist,Wishlist,getWishlist,Loading,deleteProduct}}>
    {children}
  </Wishlistcontext.Provider>
}


