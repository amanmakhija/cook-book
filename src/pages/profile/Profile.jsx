import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import './profile.css';

const getUser = async () => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get('http://localhost:3000/auth/profile', { headers: { Authorization: `Bearer ${token}` } })
        return data
    } catch (error) {
        toast.error(`${error.response.data.message} (${error.response.status})`)
    }
}

export default function Profile() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            toast.error('You must be logged in to view this page')
            navigate('/register')
        }
    }, [navigate]);

    const { data, isLoading } = useQuery({ queryKey: ['user'], queryFn: getUser })

    useMutation({
        onMutate: async (id) => {
            await axios.put(`http://localhost:3000/recipe/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        },
        onError: (error, newData, rollback) => {
            rollback()
            toast.error(`${error.response.data.message} (${error.response.status})`)
        }
    })

    if (isLoading) return <Loading />

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <div className='profile'>
            <button onClick={(e) => logout(e)} className='logout-btn'>Logout</button>
            <div className='user-img' style={{ backgroundImage: `url(${data.profilePicture})` }}></div>
            <div className='user-info'>
                <div>
                    <span>Name: </span>
                    <h1>{data.name}</h1>
                </div>
                <div>
                    <span>Email: </span>
                    <h2>{data.email}</h2>
                </div>
            </div>
        </div>
    )
}
