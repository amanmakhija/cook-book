import React from 'react'
import './loading.css'

export default function Loading() {
    return (
        <div className='loading'>
            <div className='loading-container'>
                <div className='loading-spinner'></div>
                <h1>Loading...</h1>
            </div>
        </div>
    )
}
