import React, { useEffect, useState } from 'react';
import './register.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerValidationSchema, loginValidationSchema } from '../../utils/validation';

const queryClient = new QueryClient();

export default function Register() {
    const [isLogin, setIsLogin] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            toast.info('You are already logged in');
            navigate('/');
        }
    }, [navigate]);

    const registerMutation = useMutation({
        mutationFn: async (values) => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('email', values.email);
                formData.append('password', values.password);
                formData.append('profilePic', profilePic);

                const { data } = await axios.post('http://localhost:3000/auth/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                toast.success('Registration successful');
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
        mutationFn: async (values) => {
            try {
                const { data } = await axios.post('http://localhost:3000/auth/login', { email: values.email, password: values.password });
                toast.success('Login successful');
                return data;
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        }
    });

    const handleRegister = (values) => {
        registerMutation.mutate(values);
    };

    const handleLogin = (values) => {
        loginMutation.mutate(values);
    };

    return (
        <QueryClientProvider client={queryClient}>
            {isLogin ? (
                <div className='container'>
                    <h1 className='heading'>Login</h1>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={loginValidationSchema}
                        onSubmit={handleLogin}
                    >
                        {() => (
                            <Form className='form'>
                                <div>
                                    <label htmlFor='email'>Email</label>
                                    <Field name='email' type='email' id='email' />
                                    <ErrorMessage name='email' component='div' className='error' />
                                </div>
                                <div>
                                    <label htmlFor='password'>Password</label>
                                    <Field name='password' type='password' id='password' />
                                    <ErrorMessage name='password' component='div' className='error' />
                                </div>
                                <div>
                                    <button className='submit-btn' type='submit'>Login</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <p>Don't have an account? <span onClick={() => setIsLogin(!isLogin)}>Register</span></p>
                </div>
            ) : (
                <div className='container'>
                    <h1 className='heading'>Register</h1>
                    <Formik
                        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                        validationSchema={registerValidationSchema}
                        onSubmit={handleRegister}
                    >
                        {({ setFieldValue }) => (
                            <Form className='form'>
                                <div>
                                    <label htmlFor='name'>Name</label>
                                    <Field name='name' type='text' id='name' />
                                    <ErrorMessage name='name' component='div' className='error' />
                                </div>
                                <div>
                                    <label htmlFor='email'>Email</label>
                                    <Field name='email' type='email' id='email' />
                                    <ErrorMessage name='email' component='div' className='error' />
                                </div>
                                <div>
                                    <label htmlFor='password'>Password</label>
                                    <Field name='password' type='password' id='password' />
                                    <ErrorMessage name='password' component='div' className='error' />
                                </div>
                                <div>
                                    <label htmlFor='confirm-password'>Confirm Password</label>
                                    <Field name='confirmPassword' type='password' id='confirm-password' />
                                    <ErrorMessage name='confirmPassword' component='div' className='error' />
                                </div>
                                <div>
                                    <label htmlFor='profile-pic'>Profile Picture</label>
                                    <input type='file' id='profile-pic' onChange={(event) => setFieldValue('profilePic', event.currentTarget.files[0])} />
                                    <ErrorMessage name='profilePic' component='div' className='error' />
                                </div>
                                <div>
                                    <button className='submit-btn' type='submit'>Register</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <p>Already have an account? <span onClick={() => setIsLogin(!isLogin)}>Login</span></p>
                </div>
            )}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
