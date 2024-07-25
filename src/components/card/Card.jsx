import React from 'react'
import './card.css'
import { useNavigate } from 'react-router-dom'

export default function Card({ recipe }) {
    const navigate = useNavigate()
    const openRecipe = () => {
        navigate(`/recipe/${recipe._id}`)
    }
    return (
        <div onClick={openRecipe} className='card'>
            <div className='card-thumbnail' style={{ background: `url('${recipe.thumbnail}')` }}></div>
            <div className='card-details'>
                <h1>{recipe.name}</h1>
                <p>{recipe.instructions}</p>
                <ul>
                    {recipe.ingredients.map((i, index) => (
                        index === recipe.ingredients.length - 1 ? <li key={index}>{i}</li> : <li key={index}>{i},</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
