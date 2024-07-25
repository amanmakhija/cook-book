import React, { useEffect, useState } from 'react'
import './recipe.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Recipe() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({})

    const getRecipe = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/recipes/${id}`)
            const { data } = response
            setRecipe(data)
            console.log(recipe);
        } catch (error) {
            toast.error(`${error.response.data.message} (${error.response.status})`)
        }
    }

    useEffect(() => {
        getRecipe()
    })

    return (
        <div>{recipe.name}</div>
    )
}
