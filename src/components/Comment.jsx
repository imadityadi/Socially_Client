import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {commentPost} from '../actions/posts'
const Comment = ({post}) => {
  const [commentsArr, setCommentsArr] = useState(post?.comments)
  const [commentText, setCommentText] = useState("")
  const commentRef = useRef()
  const dispatch = useDispatch()

  const user = JSON.parse(localStorage.getItem("profile"))
  const handleClick = async () => {
    const finalComment = `${user?.result?.name}: ${commentText}`
    const newComments = await dispatch(commentPost(finalComment, post._id))
    setCommentsArr(newComments)
    setCommentText('')
    commentRef.current.scrollIntoView({behaviour: 'smooth'})
  }

  

  return (
    <div className='flex w-full justify-evenly mt-2 box-border'>
      <div className="flex flex-col p-2 w-[45%] h-24 overflow-y-auto bg-gray-800 shadow-md rounded">
        {
          commentsArr.map((comment, i) => (
            <div  key={i} className="text-white" >
              <strong>{comment?.split(":")[0]}</strong>
              <span>{comment?.split(':')[1]}</span>
            </div>
          ))
        }
        <div ref={commentRef} />
      </div>
      {
        user?.result?.name && (
          <div className="flex flex-col w-[45%]">
          <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full h-16 p-2 bg-gray-700 rounded focus:outline-green-600 text-white font-medium transition-all mt-2 mb-2 "
            />
            <button 
              onClick={handleClick}
            className='w-fit h-8 px-3 py-1 bg-green-500 hover:bg-green-700 transition-all rounded text-white hover:text-gray-400'>Comment</button>
          </div>
        )}
     
    </div>
  )
}

export default Comment