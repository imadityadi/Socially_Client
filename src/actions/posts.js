import * as api from '../api'

//Action creators

export const getPost = (id) => async (dispatch) => {

    try {
       dispatch({type: 'START_LOADING'})
       const {data} = await api.fetchPost(id)
       dispatch({type: 'FETCH_POST', payload: data})
       dispatch({type: 'END_LOADING'})
   } catch (error) {
        dispatch({type: 'END_LOADING'})
        console.log(error)
       console.log(error.message)
   }
}


export const getPosts = (page) => async (dispatch) => {
    console.log(page)
   try {
       dispatch({type: 'START_LOADING'})
       const {data} = await api.fetchPosts(page)
       console.log(data)
       dispatch({type: 'FETCH_ALL', payload: data})
       dispatch({type: 'END_LOADING'})
   } catch (error) {
        dispatch({type: 'END_LOADING'})
        console.log(error)
       console.log(error.message)
   }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        
        dispatch({type: 'START_LOADING'})
        const {data: {data}} = await api.fetchPostBySearch(searchQuery)
        dispatch({type: 'FETCH_BY_SEARCH', payload: data})
        dispatch({type: 'END_LOADING'})

    } catch (error) {
        dispatch({type: 'END_LOADING'})
        console.log(error.response.data.message)
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})

        const {data} = await api.createPost(post)
        console.log(data)
        dispatch({type: 'CREATE', payload: data})

        dispatch({type: 'END_LOADING'})
    } catch (error) {
        dispatch({type: 'END_LOADING'})

        console.log(error)
    }
}

export const updatePost = (currentId, updatedPost) => async (dispatch) => {
    try {
        const { data} = await api.updatePost(currentId,updatedPost)
        dispatch({type: 'UPDATE', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({type: 'DELETE', payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
       const {data} = await api.likePost(id)
       dispatch({type: 'LIKE', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
      const {data}  = await api.commentPost(value, id)
      dispatch({type: 'COMMENT', payload: data})
      return data.comments
    } catch (error) {
        console.log(error)
    }
}