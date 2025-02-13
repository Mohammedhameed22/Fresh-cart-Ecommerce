

import React, { useContext, useEffect } from 'react'
import { Wishlistcontext } from '../../Context/WishlistContext'
import { useNavigate } from 'react-router-dom'
import Loadding from '../Loadding/Loadding';

export default function Wishlist() {


  let{Wishlist,getWishlist,Loading,deleteProduct}=useContext(Wishlistcontext)
  let navigate=useNavigate();
  useEffect(()=>{
    getWishlist()
  },[])
  return (
    <>
     {Loading?<Loadding/>:
    <div className="relative overflow-x-auto rounded-2xl  my-16">
        <table className="w-full text-sm text-left rounded-2xl rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-slate-400 ">
                <tr className=''>
                    <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
            {(Wishlist.data).map(product =>
              <tr  key={product.id} className="bg-slate-400 border-b cursor-pointer  border-slate-900 hover:bg-slate-700">

                  <td onClick={()=>navigate(`/productdetails/${product.id}`)} className="p-4">
                    <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title}/>
                  </td>
                  <td onClick={()=>navigate(`/productdetails/${product.id}`)} className="px-6 py-4 font-semibold text-gray-900 "> {product.title} </td>
                  <td className="px-6 py-4">
                      <div onClick={()=>deleteProduct(product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</div>
                      </td>
              </tr>)}
            </tbody>
        </table>
    </div>}

    
    
    
    </>
  )
}
