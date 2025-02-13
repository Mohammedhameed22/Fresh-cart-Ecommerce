import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { UserContext } from '../../Context/UserContext';


export default function Resetpassword() {
  const[isLoading,setLoading] = useState(false);
  const[errMsg, setErr] = useState(null);
  let navigate = useNavigate();
  let {setuserToken} = useContext(UserContext)

  let schemaValidation = Yup.object({
    email: Yup.string().required('Email is required').email('Enter avalid email'),
    newPassword: Yup.string().required('This is password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'Enter avalid password'),
  })


  async function resetPassword(val) {
    setLoading(true);
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, val).catch((err)=> {
      // console.log(err)
      setErr('Incorrect email or password');
      setLoading(false);
      
    })
    // console.log(data)
    if(data.token) {
      localStorage.removeItem('usertoken');
    //   localStorage.removeItem('userId');
      setuserToken(null);
      toast.success('Success')
      navigate('/');
      setErr('');
      setLoading(false);
      localStorage.removeItem('code');
    }
  }

  let formik = useFormik({
    initialValues: {
      email:'',
      newPassword:'',
    },
    validationSchema: schemaValidation ,
    onSubmit: resetPassword
  })


  return (
    <div className='my-5 '>
                    <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Reset your password securely. Regain access to your profile and protect your account.'/>
                <title>Reset Password </title>
            </Helmet>
    <h1 className='text-main text-center'>Reset Password </h1>
    <form onSubmit={formik.handleSubmit} className='mt-4'>
      <div className='row'>
        <div className="w-8/12 m-auto bg-light p-4 shadow rounded-1">
          <div className="row gy-4">
        <div className="w-100">
          <label htmlFor="email">Email</label>
          <input type="email" id='email' value={formik.values.email} name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer' />
            {formik.errors.email && formik.touched.email ? 
                <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert'>{formik.errors.email}</div>
              : ''
            }
        </div>
        <div className="w-100">
          <label htmlFor="newPassword">New Password</label>
          <input type="password" id='newPassword' value={formik.values.newPassword} name='newPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer' />
            {formik.errors.newPassword && formik.touched.newPassword ? 
              <p className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert'>{formik.errors.newPassword}</p>
              : ''
            }
        </div>

        {errMsg !== null ?
          <p className='text-danger text-center mt-1'>{errMsg}</p>
          : ''
          }
        <div className="col-md-12 text-end my-3">
          <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light'>Reset Password
          {isLoading?
          <span>
            <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
          </span>
          : ''
        }
          </button>
        </div>
          </div>
        </div>
      </div>
    </form>
    </div>
  )
}
