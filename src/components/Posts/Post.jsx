import React,{useState} from "react"
import { AiOutlineLike,  AiOutlineDelete , AiFillLike} from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import moment from "moment"
import { useDispatch } from "react-redux"
import { deletePost, likePost } from "../../actions/posts"
import { useHistory } from "react-router-dom"

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [likes, setLikes] = useState(post?.likes)
  const user = JSON.parse(localStorage.getItem('profile'))
  const userId = user?.result?.googleId || user?.result?._id
  const hasLiked = post.likes.filter((like) => like === userId)

  const handleLikeClick = async () => {
    dispatch(likePost(post._id))
    console.log(likes.includes(userId))
    if(hasLiked){
      setLikes(post.likes.filter(id => id !== userId))
    }else {
      setLikes([... post.likes, userId] )
    }
  }

  console.log(likes)

  const openPost = () => {
    history.push(`/posts/${post._id}`)

  }

  return (
    <div className="flex flex-col mt-2 mb-2  w-[95%] box-border bg-gray-800 shadow-md rounded select-none" >
      <div className="flex  relative cursor-pointer" >
        
        {
           user?.result.googleId === post?.creator || user?.result._id === post?.creator &&
           <span onClick={() => dispatch(deletePost(post._id))} className="absolute top-2 left-2 z-10">
           <AiOutlineDelete
              className="hover:cursor-pointer"
              size={20}
              color="#e40202"
             />
         </span>
        }
       
        {
          user?.result.googleId === post?.creator || user?.result._id === post?.creator &&
          <span onClick={() => setCurrentId(post._id)} className="absolute top-2 right-2 z-10">
          <FiEdit
            className="hover:cursor-pointer"
            size={20}
            color="#ffff"
          />
        </span>
        }
        <img
          onClick={openPost}
          src={post.selectedFile.base64}
          alt="post image"
          className="w-full h-60 opacity-70  object-cover rounded hover:opacity-100  transition-opacity "
        />
        <span className="absolute right-2 bottom-2 text-gray-200">
          {moment(post.createdAt).fromNow()}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col m-2 h-full justify-evenly">
          <h2 className="text-white font-semibold capitalize">{post.title}</h2>
          <p className="text-white font-normal capitalize">{post.message}</p>
          <span className="text-gray-500">{post.tags}</span>
        </div>
        <button disabled={!user?.result} className="flex  justify-evenly h-full w-1/6 items-center">
          {
            likes.includes(userId) ?
            <>
            <AiFillLike
               onClick={handleLikeClick}
               className="cursor-pointer"
               size={25}
               color={!user?.result? 'gray' : '#22c55e'}
             />
             <span className="text-white">{likes.length}</span>
            </>
            :
            <>
            <AiOutlineLike
               onClick={handleLikeClick}
               className="cursor-pointer"
               size={25}
               color={!user?.result? 'gray' : '#22c55e'}
             />
             <span className="text-white">{likes.length}</span>
            </>
          }
        </button>
      </div>
    </div>
  )
}

export default Post
