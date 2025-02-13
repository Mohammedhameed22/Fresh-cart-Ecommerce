import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loadding from '../Loadding/Loadding'

export default function Categories() {
  const [loading, setLoading] = useState(false)
  const [Categories, setCategories] = useState(null)

  async function getCategories() {
    let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    console.log(data);
    setCategories(data.data)
    setLoading(false)
    return data;
  }

   useEffect(()=>{
    getCategories()
   ,[]})

    
 
  return <>
  {loading?<Loadding/>:
  <div className="flex flex-wrap py-8 gap-y-5 justify-center px-7">
    {Categories?.map((category)=><div key={category._id} className="w-1/5">
    <div className="product p-2 rounded-lg ">
      <img className='w-full' src={category.image} alt={category.name} />
      <h2>{category.name}</h2>
    </div>
    
    </div>)}
  </div>
  
  }
    



    
  
    </>
}

