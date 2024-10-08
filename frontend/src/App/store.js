import {configureStore} from "@reduxjs/toolkit";
import blogReducer from "../features/blog/blogSlice.js"

const store= configureStore({
    reducer: blogReducer,
})

export default store;