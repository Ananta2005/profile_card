import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    isAuthenticated: !!localStorage.getItem('token'), //false,
    user: JSON.parse(localStorage.getItem('user')) || null,
    email: localStorage.getItem('email') || null,
    profilePhoto: localStorage.getItem('profilePhoto') || null,
}



export const registerUser = createAsyncThunk("user/register", async(userData, { rejectWithValue }) =>{
    try
    {
        const {data} = await axios.post("http://localhost:7001/api/auth/register", userData, {withCredentials: true})
        return data
    }
    catch(error)
    {
        return rejectWithValue(error.message)
    }
})



export const loginUser = createAsyncThunk("user/login", async(userData, {rejectWithValue}) =>  {
    try
    {
        console.log("sending loin request with: ", userData)
        const {data} = await axios.post("http://localhost:7001/api/auth/login", userData, { headers:{ "Content-Type": "application/json" }, withCredentials: true})
        return data
    }
    catch(error)
    {
        return rejectWithValue(error.message || "Login Failed")
    }
    
})


export const fetchUserDetails = createAsyncThunk("user/fetchDetails", async(_, {rejectWithValue}) =>{
    try
    {
        const {data} = await axios.get("http://localhost:7001/api/auth/user", { withCredentials:true})
        return data
    }
    catch(error)
    {
        return rejectWithValue(error.message || "Failed to fetch user")
    }
})


export const logoutUser = createAsyncThunk("user/logout", async(_, {rejectWithValue}) => {
    try
    {
        await axios.post("http://localhost:7001/api/auth/logout", {}, {withCredentials: true})
        return true
    }
    catch(error)
    {
        return rejectWithValue(error.message || "Logout failed");
    }
})






const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
            localStorage.setItem('email', action.payload.email)
            localStorage.setItem('token', 'user_token')
            localStorage.setItem('profilePhoto', action.payload)
        },
        logout: (state) =>{
            state.isAuthenticated= false
            state.user = null
            state.profilePhoto = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('profilePhoto')
            localStorage.removeItem('email')
            localStorage.clear()
        },
        updateProfilePhoto: (state, action) =>{
            state.isAuthenticated = true
            state.profilePhoto = action.payload
            localStorage.setItem('profilePhoto', action.payload)
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.isAuthenticated= true
                state.user = action.payload
                localStorage.setItem("user", JSON.stringify(action.payload))
                localStorage.setItem("email", action.payload.email)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthenticated= true
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false
                state.user = null
                localStorage.clear()
            })
    }
})

export const { login, logout, updateProfilePhoto} = userSlice.actions



export default userSlice.reducer