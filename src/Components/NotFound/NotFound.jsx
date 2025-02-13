import React from 'react';
import notF from '../../assets/images/error.svg'

export default function NotFound() {
  return (
    <div className=' p-20 w-1/2 mx-auto'>
      <img src={notF} alt="notfound img" className='w-full' />
    </div>
  )
}