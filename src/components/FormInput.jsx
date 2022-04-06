import React from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'


const FormInput = ({id, name, type, req, placeholder, showPassword, handleEyeBtn, isPassword,onChange}) => {
  return (
    <div className='relative'>
        <input
          id={id}
          name={name}
          type={type}
          required={req}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full h-10 p-2 bg-gray-700 rounded focus:outline-green-600 text-white font-medium transition-all mt-2 mb-2"
        />
        {
            isPassword &&
            <>
                {
                    showPassword?
                    <AiOutlineEye className='absolute right-3 top-5' onClick={handleEyeBtn} size={20} color="#ffff" />
                    :
                    <AiOutlineEyeInvisible className='absolute right-3 top-5' onClick={handleEyeBtn} size={20} color="#ffff" />
                }                
            </>
        }
    </div>
  )
}

export default FormInput