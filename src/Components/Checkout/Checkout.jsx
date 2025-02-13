import React, { useContext } from 'react'

import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup' 
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function Checkout() {
  const [apiError, setApiError] = useState(null)
  const navigate=useNavigate()
  const [loading, setloading] = useState(false)
  let {cart} = useContext(CartContext)
 
  async function Checkout(shippingAddress){
    try{
      setloading(true)
      let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=https://fresh-cart-ecommerce-flax.vercel.app/allorders`,{
        shippingAddress
      },{
        headers:{
            token:localStorage.getItem('usertoken')
        }
      })
    console.log(data);
    toast.success(data.status)
    

    
      

   
  

   
    
    }catch(err){
     console.log(err.response.data.message);
     
      setApiError(err.response.data.message)
      setloading(false)
      
    }
  
    

  }
  // function ValidateForm(values){
  //   let errors = {}
  //   if(!values.name){
  //     errors.name='name is required'
  //   }else if(!/^[A-Z]\w{3,15}$/.test(values.name)){
  //     errors.name='name is invalid ex(Mohammed)'

  //   }
    
  //   if(!values.phone){
  //     errors.phone ='phone is required'
  //   }else if(!/^01[0125][0-9]{8}$/.test(values.phone)){
  //     errors.phone='we need egyptian phone number'
  //   }
  //   return errors;
    

  // }
 

  const formik =useFormik({
    initialValues:{
      
      city:'',
      details:'',
      phone:'',
     
    },
    // validate:ValidateForm
   
   onSubmit:Checkout
  })
  
  return <>
    <h2>Checkout</h2>

    <form onSubmit={formik.handleSubmit} className="md:w-1/2 mx-auto">
    
  
  

  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="city" id="city" value={formik.values.city}onChange={formik.handleChange}onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city :</label>
  </div>
  
  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="details" id="details" value={formik.values.details}onChange={formik.handleChange}onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details :</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="tel" name="phone" id="phone" value={formik.values.phone}onChange={formik.handleChange}onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone :</label>
  </div>
 
 
  
  
{loading? <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    <i className='fas fa-spinner fa-spin'></i>
  </button>:<button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>}
  
  

  
</form>



  </>
}
