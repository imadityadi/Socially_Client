import React from 'react'

const Loader = () => {
  return (
    <div
          style={{border: '5px solid #f3f3f3', borderRadius: '50%',borderTop: '5px solid #17e428'}}
         className='animate-spin w-[50px] h-[50px]' ></div>
  )
}

export default Loader