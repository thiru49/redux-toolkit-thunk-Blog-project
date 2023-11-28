import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState =[]

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=> {
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        return [...response.data];
    }catch (err){
        return err.message;
    }
  
    

})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            return action.payload
        })
    }
})

export const selectAllUsers = (state) => state.users;
export const selectUserById = (state,userId) => (state.users.find(user => user.id === userId))

export default usersSlice.reducer