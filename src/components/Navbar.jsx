import React, { useState, useEffect } from "react"
import Logo from "../assets/images/earth.png"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import decode from "jwt-decode"
import { AiOutlineLogout } from "react-icons/ai"

const Navbar = ({ name }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const [user, setUser] = useState()

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    history.push("/auth")
    setUser(null)
  }

  console.log(location.pathname)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")))
    const token = user?.token
    if (token) {
      let decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
  }, [location.pathname])

  return (
    <header className="flex h-16  box-border  w-auto justify-between  items-center bg-gray-800 pl-5 pr-5 shadow-md">
      <Link to="/" className="flex w-40 justify-between items-center">
        <img className="w-auto h-10" src={Logo} alt="" />
        <span className="text-2xl font-semibold text-white">Sociallly</span>
      </Link>
      <nav className="flex text-white">
        {user?.token && (
          <div className="flex items-center justify-center ml-2 mr-2">
            <div className="flex w-[2.2rem] h-[2.2rem] bg-green-500 rounded-full items-center justify-center mr-2">
              <img
                className="w-8 h-8 rounded-full"
                src={
                  user?.result?.imageUrl
                    ? user?.result?.imageUrl
                    : `https://i.pravatar.cc/150?u=${user?.result?.email}`
                }
                alt="User"
              />
            </div>
            <span className="text-white font-normal capitalize select-none">{user?.result?.name}</span>
          </div>
        )}

        {user?.token ? (
          <button
            title="Logout"
            onClick={logout}
            className="w-50 h-50 p-2  bg-green-500  rounded-full  hover:bg-green-600 transition-all"
          >
            <AiOutlineLogout size={20} color="#fff" />
          </button>
        ) : (
          <Link
            to={location.pathname === '/auth' ? '/posts' : '/auth' }
            onClick={() => console.log('click')}
            className="w-auto border-box h-12 bg-green-500  rounded pl-8 pr-8 pb-2 pt-2 text-lg font-semibold hover:bg-green-600 transition-all"
          >
            {location.pathname === '/auth' ?  'Home' : 'Login'}
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Navbar
