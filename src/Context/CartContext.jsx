
        



import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


  export let CartContext=createContext();

  export default function CartContextProvider({children}){
    const headers ={
        token:localStorage.getItem('usertoken')
    }
    const [cart, setCart] = useState(null);
    async function addProductToCart(productId) {
        try{
            let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
                productId:productId
            },{
                headers:headers
            }

        )
        console.log(data);
        getProductsToCart()
        toast.success(data .message)
        


        }catch(err){
            console.log(err);
            

        }
        
    }
    async function deleteProductToCart(productId) {
        try{
            let{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                headers:headers
            }

        )
        console.log(data);
        setCart(data)
        toast.success(data .status)
        


        }catch(err){
            console.log(err);
            

        }
        
    }
    async function UpdateProductCountToCart(productId,count) {
        try{
            let{data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                count
            },{
                headers:headers
            }

        )
        console.log(data);
        setCart(data)
        toast.success(data .status)
        


        }catch(err){
            console.log(err);
            

        }
        
    }
    async function getProductsToCart() {
        try{
            let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers:headers
            }

        )
        console.log(data);
        setCart(data)
       
        


        }catch(err){
            console.log(err);
            

        }
        
    }
    useEffect(()=>{
        getProductsToCart();
    },[])
    return <CartContext.Provider value={{addProductToCart,cart,UpdateProductCountToCart,deleteProductToCart}}>
        {children}
    </CartContext.Provider>
  }
  