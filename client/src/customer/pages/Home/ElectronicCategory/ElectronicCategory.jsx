import React from 'react'
import ElectronicCategoryCard from './ElectronicCategoryCard'

const electronics = [
    {
        section: "ELECTRIC_CATEGORIES",
        name: "Laptop",
        image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/d/s/x/-original-imahg5ftu2dzvyu8.jpeg?q=70",
        categoryID:"laptops"
    },
    {
        section: "ELECTRIC_CATEGORIES",
        name: "Mobile",
        image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/t/h/n/-original-imahgqnzhsbg6yqm.jpeg?q=70&crop=false",
        categoryID:"mobiles"
    },
    {
        section: "ELECTRIC_CATEGORIES",
        name: "Smartwatch",
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/d/c/v/-original-imahgfkhwaxezxje.jpeg?q=70",
        categoryID:"smart_watchs"
    },
    {
        section: "ELECTRIC_CATEGORIES",
        name: "Headphone",
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/k/z/f/-original-imahgnf4yfeh7zng.jpeg?q=70",
        categoryID:"headphones"
    },
    {
        section: "ELECTRIC_CATEGORIES",
        name: "Speaker",
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/mobile-tablet-speaker/d/d/y/por-1327-portronics-original-imahe4kzcdhdeuvt.jpeg?q=70",
        categoryID:"speakers"
    },
    {
        section: "ELECTRIC_CATEGORIES",
        name: "Tv",
        image: "https://rukminim2.flixcart.com/image/312/312/xif0q/television/h/w/j/-original-imahgxq3ncgqhyma.jpeg?q=70",
        categoryID:"television"
    },
    {
        section: "ELECTRIC_CATEGORIES",
        name: "Camera",
        image: "https://rukminim2.flixcart.com/image/612/612/l5fnhjk0/dslr-camera/f/t/m/eos-r10-24-2-r10-canon-original-imagg42fsbgv79da.jpeg?q=70",
        categoryID:"cameras"
    },
]

const ElectronicCategory = () => {
  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>

        {electronics.map((item)=><ElectronicCategoryCard item={item}/>)}

    </div>
  )
}

export default ElectronicCategory