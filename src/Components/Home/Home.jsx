import React, { useContext } from 'react'
import style from './Home.module.css'
import { UserContext } from '../../Context/UserContext'

import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'

import RecentProducts from '../RecentProducts/RecentProducts'


export default function Home() {
  let x = useContext(UserContext)
  
  return <>
<MainSlider/>
<CategorySlider/>
    <RecentProducts/>
    
  
  </>
}
