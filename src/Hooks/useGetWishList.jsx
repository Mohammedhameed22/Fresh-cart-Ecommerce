import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export  function useGetWishList() {
    return useQuery({
        queryKey:["wishlist"],
        staleTime:Infinity,
        cacheTime: Infinity,
        queryFn:async ()=>{
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
                headers:{
                    token:localStorage.getItem('usertoken')
                },
            })
            return response.data;
        },
        refetchOnWindowFocus:false
    })
  
}
