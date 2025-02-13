import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Oval } from 'react-loader-spinner';

export default function Allorders() {

    
    const [userOrders, setUserOrders] = useState(null);

useEffect(() => {
    
    const res = jwtDecode(localStorage.getItem('usertoken'));

    getUserOrders(res.id)

}, []);

    async function getUserOrders(id) {
    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      
        setUserOrders(data)

    } catch (error) {
        console.error(error);
        
    }
    
}
    
    
    if (userOrders === null) {
        return (
            <div className="  flex items-center content-center w-100 my-5 py-5 ">
                <div className=" my-5 py-10 mx-auto">
                    <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        );
        
    }
    


    return <>
        <Helmet>
            <title>All Orders</title>

        </Helmet>
        <div className="py-5">
            <div className="content-center ">
                <h2 className='text-center '>All Orders</h2>
                {userOrders?.map(function (order,keay) {
                  return  <>
                        <div key={keay} className="w-100   m-3 p-5 shadow-lg  bg-light">
                          
                          <div className=" flex flex-wrap content-between ">

                              <div className="  w-50 ">
                                  <p>
                                      <strong> Order Number: </strong> {keay + 1}


                                  </p>
                                  <p>
                                      <strong> phone : </strong> {order.shippingAddress.phone}


                                  </p>
                                  <p>
                                      <strong>Details : </strong> {order.shippingAddress.details}

                                  </p>

                                  <p>
                                      <strong>City : </strong>  {order.shippingAddress.city}

                                  </p>
                                  <p>
                                      <strong>Payment Method : </strong>  {order.paymentMethodType}
                                  </p>
                                    </div>
                              <div className=" w-75 text-end px-2  flex content-between ">
                                  {order.cartItems?.map(function (item, idx) {
                                      return <>
                                          <div className="text-center w-1/6 " key={idx}>
                                              <div className="   ">
                                                  <img src={item.product.imageCover} alt="" className='w-25 py-3' />
                                              </div>
                                              <strong> Price: </strong> {item.price}
                                          </div>


                                      </>

                                  })}
                                      </div>

                                      
                                  </div>

                         
                        </div>
                    </> 
                })  }
            </div>
        </div>
        



    </>
}
