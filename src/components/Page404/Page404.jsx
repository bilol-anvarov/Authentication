import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <div className='flex flex-col gap-10 h-80 justify-center items-center'>
      <div className=' text-2xl'>Page404</div>
      <Link className='w-full' to="/"><button className='w-full'>Home</button></Link>
    </div>
  )
}
