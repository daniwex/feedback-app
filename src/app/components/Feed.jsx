import React from 'react'

export default function Feed({title, details, category, border=false, upvotes=0}) {
  return (
    <div className={`bg-white my-3 p-5 rounded-md ${border ? 'border-t-4 border-t-[#AD1FEA]' : ''}`}>
      <h2 className='font-bold text-lg'>{title}</h2>
      <p className='py-4 text-sm'>{details}</p>
      <span className='w-fit px-6 rounded-full py-2 text-[#4661E6] bg-[#F2F4FF]'>{category}</span>
      <div className='flex justify-between mt-5 items-center'>
        <span className='w-fit px-6 rounded-full py-2 text-[#4661E6] bg-[#F2F4FF]'>0</span>
        <div className='inline-flex'><img className='h-full pr-3' src='/assets/shared/icon-comments.svg' /> <span>{upvotes}</span></div>
      </div>
    </div>
  )
}
