import React from 'react'

const Button = ({label,type}) => {
  return (
    <button type={type} className='w-full bg-green-500 h-12 rounded text-lg text-white  translate-y-0 font-semibold tracking-wide hover:bg-green-600 transition-all focus:translate-y-1'>{label}</button>
  )
}

export default Button