import React, { useEffect, useState } from 'react';
import './register.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useNavigate } from 'react-router-dom'

const queryClient = new QueryClient();

export default function Register() {
    const [isLogin, setIsLogin] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            toast.info('You are already logged in');
            navigate('/');
        }
    }, [navigate]);

    const registerMutation = useMutation({
        mutationFn: async () => {
            try {
                if (password !== confirmPassword) {
                    toast.error('Passwords do not match');
                    return;
                }
                const { data } = await axios.post('http://localhost:3000/auth/register', { name, email, password });
                toast.success('Registration successful');
                console.log(data);
                return data;
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', JSON.stringify(data.user.name));
        }
    });

    const loginMutation = useMutation({
        mutationFn: async () => {
            try {
                const { data } = await axios.post('http://localhost:3000/auth/login', { email, password });
                toast.success('Login successful');
                return data;
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', JSON.stringify(data.user.name));
        }
    });

    const handleRegister = (e) => {
        e.preventDefault();
        registerMutation.mutate();
        navigate('/');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        loginMutation.mutate();
        navigate('/');
    };

    return (
        <QueryClientProvider client={queryClient}>
            {isLogin ? (
                <div className='container'>
                    <h1 className='heading'>Login</h1>
                    <form className='form' onSubmit={(e) => handleLogin(e)}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' id='email' />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' id='password' />
                        </div>
                        <div>
                            <input className='submit-btn' type='submit' value='Login' />
                        </div>
                    </form>
                    <p>Don't have an account? <span onClick={() => setIsLogin(!isLogin)}>Register</span></p>
                </div>
            ) : (
                <div className='container'>
                    <h1 className='heading'>Register</h1>
                    <form className='form' onSubmit={(e) => handleRegister(e)}>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type='text' id='name' />
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' id='email' />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' id='password' />
                        </div>
                        <div>
                            <label htmlFor='confirm-password'>Confirm Password</label>
                            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' id='confirm-password' />
                        </div>
                        <div>
                            <label htmlFor='profile-pic'>Profile Picture</label>
                            <input value={profilePic} onChange={(e) => setProfilePic(e.target.files[0])} type='file' id='profile-pic' />
                        </div>
                        <div>
                            <input className='submit-btn' type='submit' value='Register' />
                        </div>
                    </form>
                    <p>Already have an account? <span onClick={() => setIsLogin(!isLogin)}>Login</span></p>
                </div>
            )}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
