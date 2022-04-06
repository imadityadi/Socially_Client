import React,{useEffect, useState} from 'react'
import Form from '../components/Form'
import Navbar from '../components/Navbar'
import Pagination from '../components/Pagination'
import Posts from '../components/Posts/Posts'
import {useDispatch} from 'react-redux'
import {getPostBySearch, getPosts} from '../actions/posts'
import { AiOutlineSearch } from 'react-icons/ai'
import {useLocation, useHistory} from 'react-router-dom'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import '../index.css'

function useQuery(){ 
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(null)
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])

  const page = useQuery().get('page')
  const searchQuery = useQuery().get('searchQuery')
  const history = useHistory()
console.log(searchQuery)
    console.log(search)
  
  const searchPost = () => {
    if(search.trim() || tags){
      dispatch(getPostBySearch({search, tags: tags.join(',')}))
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    }else {
      history.push('/')
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      searchPost()
    }
  }
  

  

  return (
    <div className='flex-col md:h-auto h-full'>      
       <section className="flex flex-col-reverse md:flex-row justify-evenly  items-center md:items-start  mt-4">
        <Posts page={page? page : 1}  setCurrentId={setCurrentId} />
        <div className='flex flex-col'>
        {/* <ReactTagInput 
      tags={tags}
      maxTags={5}
      removeOnBackspace={true} 
      onChange={(newTags) => setTags(newTags)}
    />
        <div className='relative flex items-center'>
          <input placeholder='Type and press enter to search' type="text" name="search" className='w-full h-10 p-2 pr-10 bg-gray-700 rounded focus:outline-green-600 text-white font-medium transition-all mt-2 mb-2' onKeyUp={handleKeyPress} value={search} onChange={(e) => setSearch(e.target.value)} />
          <AiOutlineSearch size={20} color="#fff" className='hover:fill-green-500 absolute right-5 top-5 select-none' />
        </div> */}
       <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
       </section>
    </div>
  )
}

export default Home