import React, { useState } from 'react'
import FilterSection from './FilterSection'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'



const Products = () => {
    const [sort,setSort] = useState("price_low")

    const handleSortProduct = (e) => {
        setSort(e.target.value)
    }
  return (
    <div className='-z-10 mt-10'>
        <div className=''>
            <h1 className='text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2'>women sarees</h1>
        </div>
        <div className='lg:flex'>
            <section className='border-r hidden lg:block w-[20%] min-h-screen border-gray-300 '>
                <FilterSection />
            </section>

            <section className='w-full lg:w-[80%] space-y-5 '>

                <div className='flex justify-between items-center px-9 h-40px '>
                    
                    <div>

                    </div>
                    <FormControl >
                        <InputLabel id="sort">Sort</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="sort"
                            value={sort}
                            label="Sort"
                            onChange={handleSortProduct}
                        >
                            <MenuItem value={"price_low"}>Price : Low - High</MenuItem>
                            <MenuItem value={"price_high"}>Price : High - Low</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                

            </section>
        </div>
    </div>
  )
}

export default Products