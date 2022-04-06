import React, { useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { getPost, getPostBySearch } from "../actions/posts"
import Loader from "../components/Loader"
import Comment from "../components/Comment"

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector(state => state.posts)
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getPost(id))
  }, [id])


  if (!post) return null


  return (
    <div className="flex flex-col justify-evenly w-full mb-3 ">
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex w-full justify-between p-3 box-border bg-gray-700 shadow-md ">
          <div className="flex w-[48%] ">
            <img
              className="w-full h-auto object-cover rounded"
              src={post.selectedFile.base64}
              alt="post image"
            />
          </div>
          <div className="flex flex-col justify-between p-3 box-border bg-gray-800 rounded w-[48%]  shadow-green-500 shadow-inner select-none">
           <div className="flex flex-col">
           <h2 className="text-white font-medium">{post.title}</h2>
            <div className="w-full h-[1px] bg-gray-300 my-4"></div>
            <p className="text-white font-light">{post.message}</p>
           </div>
           <div className="text-gray-400 text-xs flex flex-col">
             <span className="capitalize">{`Created By- ${post.name}, ${moment(post?.createdAt).fromNow()}`}</span>
             <span className="text-green-400">{post.tags.join(',')}</span>
           </div>
          </div>
        </div>
      )}
      <Comment post={post} />
    </div>
  )
}

export default PostDetails
