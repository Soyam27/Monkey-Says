import React from 'react'

const AnimatedBlock = (parameters) => {
  return (
    <div className='hidden lg:flex flex-col gap-3  items-center justify-center bg-base-200 rounded-md'>
    <div className='text-center'>
      <div className='grid grid-cols-3 gap-3'>
        {
          [...Array(9)].map((_, i) => (
            <div key={i} className={`aspect-square p-12 bg-[hsl(var(--primary)/0.2)] rounded-xl ${
              i%2===0?"animate-pulse":""
            }`} />
          ))
        }
      </div>

    </div>

    <h1 className='text-xl font-semibold'>{parameters.title}</h1>
    <p className='w-[60%] text-sm text-base-content opacity-40 text-center'>{parameters.Description}</p>

  </div>
  )
}

export default AnimatedBlock
