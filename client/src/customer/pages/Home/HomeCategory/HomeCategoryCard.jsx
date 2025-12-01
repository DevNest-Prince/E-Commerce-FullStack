import React from 'react'

const HomeCategoryCard = () => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>

        <div className='custom-border w-[150px] lg:w-[249px] h-[150px] lg:h-[249px] rounded-full bg-teal-400'>
            <img
                className='group-hover:scale-95 transition-transform transform duration-700 object-cover object-top h-full w-full rounded-full' 
                src={"https://rukminim2.flixcart.com/image/612/612/kmjhw280/table-lamp/v/g/x/designer-foziq03202214-foziq-original-imagfewnb2encxzn.jpeg?q=70"} 
                alt="" 
            />
        </div>
        <h1 className='font-medium'>{"Lamps & Lighting"}</h1>

    </div>
  )
}

export default HomeCategoryCard