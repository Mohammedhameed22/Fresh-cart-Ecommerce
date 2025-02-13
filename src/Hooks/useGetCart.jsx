import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export  function useGetCart() {
    return useQuery({
        queryKey:["cart"],
        staleTime:Infinity,
        cacheTime: Infinity,
        queryFn:async ()=>{
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
                headers:{
                    token:localStorage.getItem('usertoken')
                },
            })
            return response.data;
        },
        refetchOnWindowFocus:false
    })
  
}