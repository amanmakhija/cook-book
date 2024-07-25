import React, { useEffect, useState } from 'react'
import './register.css'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function Register() {
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState({})

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [profilePic, setProfilePic] = useState(null)

    const handleRegister = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        const formData = new FormData();
        formData.append(`${name}`, profilePic);

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );
        const { secure_url } = response.data;

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, profilePic: secure_url })
            const { data } = response
            setUser(data)
            toast.success('Registration successful')
        } catch (error) {
            toast.error(`${error.response.data.message} (${error.response.status})`)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password })
            const { data } = response
            setUser(data)
            toast.success('Login successful')
        } catch (error) {
            toast.error(`${error.response.data.message} (${error.response.status})`)
        }
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <>
            {isLogin ? (
                <div className='login'>
                    <h1>Login</h1>
                    <form>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type='email' id='email' />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type='password' id='password' />
                        </div>
                        <div>
                            <button onClick={(e) => handleLogin(e)}>Login</button>
                        </div>
                    </form>
                    <p>Don't have an account? <span onClick={() => setIsLogin(!isLogin)}>Register</span></p>
                </div>
            ) : (
                <div className='register'>
                    <h1>Register</h1>
                    <form>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input onChange={(e) => setName(e.target.value)} type='text' id='name' />
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type='email' id='email' />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type='password' id='password' />
                        </div>
                        <div>
                            <label htmlFor='confirm-password'>Confirm Password</label>
                            <input onChange={(e) => setConfirmPassword(e.target.value)} type='password' id='confirm-password' />
                        </div>
                        <div>
                            <label htmlFor='profile-pic'>Profile Picture</label>
                            <input onChange={(e) => setProfilePic(e.target.value)} type='file' id='profile-pic' />
                        </div>
                        <div>
                            <button onClick={(e) => handleRegister(e)}>Register</button>
                        </div>
                    </form>
                    <p>Already have an account? <span onClick={() => setIsLogin(!isLogin)}>Login</span></p>
                </div>
            )}
        </>
    )
}