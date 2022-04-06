import React, { useState } from "react"
import Button from "./Button"
import FormInput from "./FormInput"
import { GoogleLogin } from "react-google-login"
import { AiFillGoogleCircle } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import {signin,  signup} from '../actions/auth'
const initalState = {
  name: "",
  email: "",
  password: "",
}
const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const [formData, setFormData] = useState(initalState)

  const handleOnChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }



  const onGoogleSuccess = async res => {
    console.log(res)
    const result = res?.profileObj
    const token = res?.tokenId
    try {
      dispatch({ type: "AUTH", payload: { result, token } })
      history.push("/")
    } catch (error) {
      console.log(error)
    }
  }
  const onGoogleFailure = () => {
    console.log("Google Signin unsucessfull try again later")
  }

  console.log(formData)

  const handleSubmit = e => {
    e.preventDefault()

    if(isSignup){
      dispatch(signup(formData, history))
    }else {
      dispatch(signin(formData, history))
    }
  }

  return (
    <div className="flex flex-col p-5 rounded bg-gray-800 select-none w-[90%] md:w-auto">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="text-center text-white  font-medium">
          Create New Account
        </div>
        {!isSignup ? (
          <>
            <input
              id="email"
              name="email"
              type="email"
              required={true}
              placeholder="Enter Email"
              onChange={handleOnChange}
              className="w-full h-10 p-2 bg-gray-700 rounded focus:outline-green-600 text-white font-medium transition-all mt-2 mb-2"
            />
            <FormInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              showPassword={showPassword}
              isPassword={true}
              onChange={handleOnChange}
              handleEyeBtn={() => setShowPassword(!showPassword)}
            />
            <Button label="Login" />
            <GoogleLogin
              clientId="193967842601-jktbrcig5pctui7hfsf7b8hu0ppo05k4.apps.googleusercontent.com"
              render={renderProps => (
                <button
                  className="flex items-center justify-evenly bg-green-200 h-fit w-full p-2 rounded mt-5 text-black"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Login with Google
                  <AiFillGoogleCircle size={25} color="rgb(34,197,94)" />
                </button>
              )}
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
              cookiePolicy="single_host_origin"
            />
            <span
              onClick={() => setIsSignup(true)}
              className="text-green-500 font-normal cursor-pointer text-center mt-5"
            >
              Create New Account
            </span>
          </>
        ) : (
          <>
            <input
              id="name"
              name="name"
              type="text"
              required={true}
              placeholder="Your Full Name"
              onChange={handleOnChange}
              className="w-full h-10 p-2 bg-gray-700 rounded focus:outline-green-600 text-white font-medium transition-all mt-2 mb-2"
            />
            <input
              id="email"
              name="email"
              type="text"
              required={true}
              placeholder="Enter Email"
              onChange={handleOnChange}
              className="w-full h-10 p-2 bg-gray-700 rounded focus:outline-green-600 text-white font-medium transition-all mt-2 mb-2"
            />

            <FormInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              showPassword={showPassword}
              isPassword={true}
              onChange={handleOnChange}
              handleEyeBtn={() => setShowPassword(!showPassword)}
            />
            <Button label="Signup" />
            <span className="text-white font-normal mt-5">
              Already have an account?
              <span
                onClick={() => setIsSignup(false)}
                className="text-green-500 ml-2 font-normal cursor-pointer"
              >
                Login
              </span>
            </span>
          </>
        )}
      </form>
    </div>
  )
}

export default AuthForm
