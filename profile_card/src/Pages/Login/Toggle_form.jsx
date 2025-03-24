import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, updateProfilePhoto, loginUser } from '../../Slice/userSlice'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './Login.css'


const Toggle_form = () => {

    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    
    const navigate = useNavigate()

    const handleLogin = async () =>{
        if(!username || !password)
            {
              alert('Please fill all fields')
              return
            }
            console.log("User data before sending request: ", {username, password})
        // localStorage.setItem('token', 'user_token')
        // dispatch(login({ username, email }))
        // console.log("Login successfully")
        // toast.success("Thanks for Login", {
        //     position: "top-center",
        // })
        // window.dispatchEvent(new Event('storage'))
        // // navigate('/profile')

        try
        {
            const resultAction = await dispatch(loginUser({ "name":username, password }))
            console.log("Login response: ", resultAction)
            if(resultAction.meta.requestStatus === "fulfilled")
            {
                toast.success("Login successful")
                navigate("/profile")
            }
            else
            {
                toast.error(resultAction.payload || "Login failed")
            }
        }
        catch(error)
        {
            toast.error(error || "Login failed")
        }
    }

    const handleSignup = () =>{
        setIsLogin(true)
        navigate('/login')
    }

  return (
    <div className='form-body'>
        <ToastContainer />
        <div className='form-container'>
            <div className='form-toggle'>
                <button className={isLogin ? 'active' : 'inactive'} onClick={() => setIsLogin(true)}>
                    Login
                </button>
                <button className={!isLogin ? 'active' : 'inactive'} onClick={() => setIsLogin(false)}>
                    Signup
                </button>
            </div>

            {isLogin ? (
                <div className='form'>
                    <h2> Login Form</h2>
                    {/* <input type='text' placeholder= 'ID' /> */}
                    <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={handleLogin}>Login</button>
                    <p>Not a member? <a href='#' onClick={() => setIsLogin(false)}>Signup now</a></p>
                </div>
            ) : (
                
                <div className='form'>
                    <h2>Signup Form</h2>
                    <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type='email' placeholder='Email' value= {email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {/* <input type='password' placeholder='Confirm Password' /> */}
                    <button onClick={handleSignup}>Signup</button>
                </div>
            )}

        </div>
    </div>
  )
}

export default Toggle_form