import { createAsyncThunk, createSlice, createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from 'axios';

const postsAdapter = createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
    status:'idle',
    error:null
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=> {
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return [...response.data];
    }catch (err){
        return err.message;
    }
})

export const addPosts = createAsyncThunk('posts/addPosts', async (initial)=> {
    try{
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts',initial)
        return response.data;
    }catch (err){
        return err.message;
    }
})
export const updatePost = createAsyncThunk('posts/updatePost', async (initial)=> {
    const {id} = initial;
    try{
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,initial)
        return response.data;
    }catch (err){
        return err.message;
    }
});

export const deletePost = createAsyncThunk('posts/deletePost',async (initialPost)=>{
    const id = initialPost;
    try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        if (response?.status === 200) return initialPost
        return `${response?.status} : ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.entities[postId]
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder){
        builder
              .addCase(fetchPosts.pending,(state,action)=>{
                state.status = 'loading'
              }
              )
              .addCase(fetchPosts.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), {
                        minutes : min ++
                    }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                })
                postsAdapter.upsertMany(state,loadedPosts)
              }
              )
              .addCase(fetchPosts.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
              }
              )
              .addCase(addPosts.fulfilled,(state,action)=>{
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                postsAdapter.addOne(state,action.payload)
              }
              )
              .addCase(updatePost.fulfilled,(state,action)=>{
                if(!action.payload?.id){
                    console.log('update could ot complete')
                    console.log(action.payload)
                    return
                }
                
                action.payload.date = new Date().toISOString();
                postsAdapter.upsertOne(state,action.payload)
              })
              .addCase(deletePost.fulfilled,(state,action)=>{
                if(!action.payload?.id){
                    console.log('delete could ot complete')
                    console.log(action.payload)
                    return
                }
                const {id} =action.payload;
                postsAdapter.removeOne(state,id)
              })

         
 
    }
})


export const {selectAll:selectAllPosts,
selectById:selectPostById,
selectIds:selectPostIds} = postsAdapter.getSelectors(state  => state.posts) 
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;



export const selectPostsByUser = createSelector([selectAllPosts,(state,userId)=>userId],(posts,userId)=> posts.filter(post=> post.userId === userId))

export const {  reactionAdded } = postsSlice.actions

export default postsSlice.reducer