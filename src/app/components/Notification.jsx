import React from 'react'

export default function Notification({message, closebtn}) {
  return (
    <div className='mt-4 p-3 bg-green-600 text-white flex justify-between'>
      {message}
      <span onClick={closebtn}><i class="fas fa-times"></i></span>
    </div>
  )
}
