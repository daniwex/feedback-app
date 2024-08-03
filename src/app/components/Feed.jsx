import React from 'react'

export default function Feed({title, details, category, border=false, upvotes=0, comments=0}) {
  return (
    <div className={`bg-white my-3 p-5 rounded-md ${border ? 'border-t-4 border-t-[#AD1FEA]' : ''}`}>
      <h2 className='font-bold text-lg'>{title}</h2>
      <p className='py-4 text-sm'>{details}</p>
      <span className='w-fit px-6 rounded-lg font-bold py-2 text-[#4661E6] bg-[#F2F4FF] text-sm'>{category}</span>
      <div className='flex justify-between mt-5 items-center'>
        <span className='text-sm w-fit px-6 rounded-lg py-2 text-[#4661E6] bg-[#F2F4FF]'>{upvotes}</span>
        <div className='inline-flex items-center'><img className='h-full pr-3' src='/assets/shared/icon-comments.svg' /> <span className='text-sm'>{comments}</span></div>
      </div>
    </div>
  )
}
