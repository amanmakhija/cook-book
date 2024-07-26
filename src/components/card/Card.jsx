import React from 'react'
import './card.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function Card({ recipe }) {
    const navigate = useNavigate()

    const openRecipe = () => {
        navigate(`/recipe/${recipe.id}`)
    }

    const addToFavouriteMutation = useMutation({
        mutationFn: async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.put('http://localhost:3000/auth/update', { favouriteRecipe: `${recipe.id}` }, { headers: { Authorization: `Bearer ${token}` } });
                data.favouriteRecipes.includes(recipe.id) ? toast.success('Added to favourites') : toast.success('Removed from favourites');
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(data));
                return data;
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    });

    const handleFavourite = () => {
        addToFavouriteMutation.mutate();
    };

    const { id, favouriteRecipes } = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className={(id && recipe.postedBy.includes(id)) ? 'owner card' : 'card'}>
            <span className='my-recipe'>My Recipe</span>
            <div onClick={openRecipe} className='card-thumbnail' style={{ backgroundImage: `url(${recipe.thumbnail})` }}></div>
            <div onClick={openRecipe} className='card-details'>
                <h1>{recipe.name}</h1>
                <p dangerouslySetInnerHTML={{ __html: recipe.description }}></p>
                <span>{recipe.ingredients}</span>
            </div>
            <div onClick={handleFavourite} className='heart'>{(id && favouriteRecipes.includes(recipe.id)) ? <i className="fa-solid fa-heart red"></i> : <i className="fa-regular fa-heart"></i>}</div>
        </div>
    )
}
