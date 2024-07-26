import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Profile() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            toast.error('You must be logged in to view this page')
            navigate('/register')
        }
    });

    return (
        <div>Profile</div>
    )
}
