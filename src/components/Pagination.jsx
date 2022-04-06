import React from "react"
import { Link } from "react-router-dom"

const Pagination = ({ currentPage, numberOfPages }) => {
  const pageNumbers = []
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i)
  }

  return (
    
      <nav
        className="flex bg-gray-800 rounded py-1 px-2"
        aria-label="Pagination"
      >
        <ul className="flex text-white">
          {pageNumbers.map(number => {
            return (
              <li className="border border-green-500 px-3 py-1 rounded m-1" key={number}>
                <Link
                  to={`/posts?page=${number}`}
                  className=""
                >
                  {number}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
  )
}

export default Pagination
