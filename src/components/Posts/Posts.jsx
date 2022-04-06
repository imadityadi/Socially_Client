import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/posts'
import Loader from '../Loader'
import Pagination from '../Pagination'
import Post from './Post'

const Posts = ({setCurrentId, page}) => {
  const {posts, numberOfPages, isLoading} = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(page) {
      dispatch(getPosts(page))
    }
  }, [page])

  if(!isLoading && !posts.length) return 'No Post'

  return (
    <div className='flex flex-col w-full md:w-1/2 h-[86vh] md:overflow-y-auto bg-gray-700 rounded items-center'>
       {
         !isLoading?
         posts?.map((item) =>{
           return (
             <Post setCurrentId={setCurrentId} key={item._id} post={item} />
           )
         })
         :
         <div className='flex justify-center items-center h-1/2'>
           <Loader/>
         </div>

       }
       <Pagination page={page} numberOfPages={numberOfPages} />
    </div>
  )
}

export default Posts