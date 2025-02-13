import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loadding from '../Loadding/Loadding'

export default function Brands() {
  const [loading, setLoading] = useState(false)
  const [Brands, setBrands] = useState(null)

  async function getBrands() {
    let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    console.log(data);
    setBrands(data.data)
    setLoading(false)
    return data;
  }

   useEffect(()=>{
    getBrands()
   ,[]})

    
 
  return <>
  {loading?<Loadding/>:
  <div className="flex flex-wrap py-8 gap-y-5 justify-center px-7">
    {Brands?.map((brand)=><div key={brand._id} className="w-1/5">
    <div className="product p-2 rounded-lg ">
      <img className='w-full' src={brand.image} alt={brand.name} />
      <h2>{brand.name}</h2>
    </div>
    
    </div>)}
  </div>
  
  }
    



    
  
    </>
}

