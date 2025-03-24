import { configureStore, createReducer } from "@reduxjs/toolkit";
import userReducer from '../Slice/userSlice'
import cartReducer from '../Slice/cartSlice'

const store = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer,
    },
})

export default store