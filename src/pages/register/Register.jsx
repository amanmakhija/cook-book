import React, { useEffect, useState } from 'react';
import './register.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerValidationSchema, loginValidationSchema } from '../../utils/validation';


export default function Register() {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            toast.info('You are already logged in');
            navigate('/');
        }
    }, [navigate]);

    const uploadProfilePic = async (profilePic, email) => {
        try {
            const formData = new FormData();
            formData.append('file', profilePic);
            formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
            formData.append('public_id', email);
            formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);

            const { data } = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            return data.secure_url;

        } catch (error) {
            console.error('Error uploading profile picture:', error);
            throw error;
        }
    }

    const registerMutation = useMutation({
        mutationFn: async (values) => {
            try {
                const { name, email, password, profilePic } = values;

                // Upload profile picture to Cloudinary
                const secure_url = await uploadProfilePic(profilePic, email);

                const { data } = await axios.post('http://localhost:3000/auth/register', {
                    name,
                    email,
                    password,
                    profilePicture: secure_url
                });
                toast.success('Registration successful');
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
        <>
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
        </>

    );
}
