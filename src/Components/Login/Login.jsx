import React, { useContext } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup' 
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Login() {
  const [apiError, setApiError] = useState(null)
  const [loading, setloading] = useState(false)
  let {setuserToken} = useContext(UserContext)
  let navigate = useNavigate();
  async function login(values){
    try{
      setloading(true)
      let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
    console.log(data);
    localStorage.setItem('usertoken',data.token)
    setuserToken(data.token)
    setloading(false)
    navigate('/')
    
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
  let validationSchema = Yup.object().shape({
   
    email : Yup.string().required('email is required').email('email is invalid'),
    password : Yup.string().required('password is required').matches(/^[A-Z]\w{4,10}$/,'invalid password ex(Ahmed123) ')
   

  })

  const formik =useFormik({
    initialValues:{
      
      email:'',
      password:''
     
    },
    // validate:ValidateForm
    validationSchema:validationSchema,
   onSubmit:login
  })
  
  return <>
    <h2>Login</h2>

    <form onSubmit={formik.handleSubmit} className="md:w-1/2 mx-auto">
    {apiError && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {apiError}
</div>}
  
  
  

  <div className="relative z-0 w-full mb-5 group">
    <input type="email" name="email" id="email" value={formik.values.email}onChange={formik.handleChange}onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email :</label>
  </div>
  {formik.errors.email&&formik.touched.email && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik.errors.email}
</div>}
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="password" id="password" value={formik.values.password}onChange={formik.handleChange}onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password :</label>
  </div>
  {formik.errors.password&&formik.touched.password && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik.errors.password}
</div>}
  
  
{loading? <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    <i className='fas fa-spinner fa-spin'></i>
  </button>:<button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>}
  
  

  <Link
                to="/forgetPassword"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-auto  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Forgot Password
              </Link>
</form>



  </>
}