import {createSlice,nanoid} from "@reduxjs/toolkit";

const initialState={
    user: null
}

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers:{
        setUser(state,action){
            state.user=action.payload
        }
    }
})

export const {setUser} = blogSlice.actions;

export default blogSlice.reducer