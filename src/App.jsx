
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'

import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import Checkout from './Components/Checkout/Checkout.jsx'
import Allorders from './Components/Allorders/Allorders.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Wishlist from './Components/Wishlist/Wishlist.jsx'
import Forgetpassword from './Components/Forgetpassword/Forgetpassword.jsx'

import Resetpassword from './Components/Resetpassword/Resetpassword.jsx'
import WishlistcontextProvider from './Context/WishlistContext.jsx'




let routers = createBrowserRouter([{
  path:'' , element : <Layout/>,children:[
    {path: 'register' , element: <Register/>},
    {path:'login' , element: <Login/>},
    {path:'forgetpassword' , element: <Forgetpassword/>},
    {path:'resetpassword' , element: <Resetpassword/>},
    
    {index:true , element:<Home/> },
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute> },
    {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute> },
    {path:'wishlist' , element:<Wishlist/> },
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute> },
  
    {path:'checkout' , element:<ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:'allorders' , element:<ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'productdetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'*' , element: <NotFound/>},
  ]
}])
const query = new QueryClient()
function App() {

  return <>
  

  <QueryClientProvider client={query}>
   

  
<CartContextProvider>
  <WishlistcontextProvider>

<UserContextProvider>
<RouterProvider router={routers}></RouterProvider>


</UserContextProvider>

 
<Toaster/>
</WishlistcontextProvider>




</CartContextProvider>



</QueryClientProvider>


 

  </>
}

export default App
