import React, { useEffect } from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [localStorage.getItem('user')])

    const search = (e) => {
        e.preventDefault()
        navigate(`/search/${searchValue}`)
    }

    return (
        <nav className='navbar'>
            <h1 onClick={() => navigate('/')} className='navbar-hero'>CookBook</h1>
            <div>
                <div>
                    <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type='text' placeholder='Search by Name / Ingredient' className='navbar-search' />
                    <button onClick={(e) => search(e)} className='navbar-search-btn'><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <ul className='navbar-options'>
                    <li>{user && <a href='/post-recipe'>Post</a>}</li>
                    <li>{user ? <a href='/profile'>Hi, {user.name}</a> : <a href='/register'>Register</a>}</li>
                </ul>
            </div>
        </nav>
    )
}
