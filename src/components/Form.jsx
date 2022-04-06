import React, { useEffect, useState } from "react"
import Button from "./Button"
import FileBase from 'react-file-base64'
import {useDispatch, useSelector} from 'react-redux'

import {createPost, updatePost} from '../actions/posts'


const Form = ({setCurrentId, currentId, }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })
  const dispatch = useDispatch()
  const {posts} = useSelector((state) => state.posts)
  const post = currentId?  posts?.find(p => p._id === currentId) : null
  const user = JSON.parse(localStorage.getItem('profile'))

  const clear = () => {
    setCurrentId(null)
    setPostData({ 
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })
  }
  
  const handleSubmit = (e) => {
      e.preventDefault()
      if(currentId){
        dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
      }else {
        dispatch(createPost({...postData, name: user?.result?.name}))

      }
      clear()
  }

 

  useEffect(() => {
    if(post) setPostData(post)
  }, [post])
  
  if(!user?.result?.name){
    return (
      <div className="flex bg-gray-800 rounded p-4"> 
        <h6 className="text-white font-medium">Please login to create and like post</h6>
      </div>
    )
  }

  return (
    <div className="flex-col max-w-sm bg-gray-800 justify-center  rounded shadow-md p-2 box-border  text-center h-fit ">
      <div className="text-white text-lg font-semibold cursor-pointerw-full mt-4 mb-4">
        {currentId? "Update" : "Create"} Post
      </div>
      <form onSubmit={handleSubmit} className="container flex-col">
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          className="w-full h-10 p-2 bg-gray-700 rounded focus:outline-green-600 text-white font-medium transition-all mt-2 mb-2"
          value={postData.title}
          onChange={(e) => setPostData({...postData, title: e.target.value})}
        />
        <textarea
          id="description"
          name="description"
          value={postData.message}
          onChange={(e) => setPostData({...postData, message: e.target.value})}
          placeholder="Description"
          className="w-full h-16 p-2 bg-gray-700 rounded focus:outline-green-600 text-white font-medium transition-all mt-2 mb-2 "
        />
        <input
          id="tags"
          type="text"
          placeholder="Tags"
          value={postData.tags}
          onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
          className="w-full h-10 p-2 bg-gray-700 rounded focus:outline-green-600 text-white font-medium transition-all mt-2 mb-2"
        />
        <FileBase
          type="file"
          multiple={false}
          onDone={(file) => setPostData({...postData, selectedFile: file}) }
          />
        <div className="mt-2">
          <Button type="submit" label="Post" />
        </div>
      </form>
    </div>
  )
}

export default Form
