import React from 'react'

function Banner() {
    return (
        <>
            <div className='bg-[url("/banner.jpg")] bg-cover bg-center min-h-[300px] w-full flex justify-center items-center flex-col'>
                <p className='bg-white inline font-poppins px-1 text-3xl h-9'>VaultBLOG</p>
                <p className='text-white text-lg mt-4 text-center'>"Grow, learn, and become your best self."</p>
            </div>
        </>
    )
}

export default Banner