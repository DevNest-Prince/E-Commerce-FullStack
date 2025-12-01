import React from 'react'
import ElectronicCategory from './ElectronicCategory/ElectronicCategory'
import Grid from './Grid/Grid'
import DealCard from './Deal/DealCard'
import Deal from './Deal/Deal'
import HomeCategory from './HomeCategory/HomeCategory'
import { Button } from '@mui/material'
import StoreIcon from '@mui/icons-material/Store';



const Home = () => {
  return (
    <div className='space-y-10'>
        <ElectronicCategory />
        <section>
            <Grid />
        </section>
        <section className='pt-10'>
            <h1 className='text-3xl font-bold text-center pb-5'>Today's Deal</h1>
            <Deal />
        </section>
        <section className='pt-10'>
            <h1 className='text-3xl font-bold text-center pb-5'>Shop By Category</h1>
            <HomeCategory />
        </section>
        <section className='lg:px-20 relative h-[200px] lg:h-[450px] object-cover '>
            <img className='w-full h-[90%] '
                src="https://zosh-bazzar.vercel.app/seller_banner_image.jpg" 
                alt="" 
            />
            <div className='absolute top-1/2 lefr-4 lg:left-15rem transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3'>
                <h1 className='pl-40'>Sell Your Product</h1>
                <p className='text-lg md:text-2xl pl-40'>With <strong className='logo text-3xl md:text-5xl pl-2'>Apna Bazzar</strong></p>
                <div className='pl-60 pt-6 justify-center'>
                    <Button startIcon={<StoreIcon />} variant='contained'>Become Seller</Button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home