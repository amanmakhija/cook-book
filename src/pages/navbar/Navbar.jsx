import React from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    return (
        <nav className='navbar'>
            <h1 onClick={() => navigate('/')} className='navbar-hero'>CookBook</h1>
            <div>
                <div>
                    <input type='text' placeholder='Search by Name / Ingredient' className='navbar-search' />
                    <button className='navbar-search-btn'><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <ul className='navbar-options'>
                    <li><a href='/post-recipe'>Post</a></li>
                    <li><a href='/profile'>Profile</a></li>
                    <li><a href='/register'>Register</a></li>
                </ul>
            </div>
        </nav>
    )
}
