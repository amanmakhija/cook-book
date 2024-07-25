import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../../components/card/Card'
import './home.css'

export default function Home() {
    const [recipes, setRecipes] = useState([])

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/recipes')
            const { data } = response
            setRecipes(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className='home'>
            {recipes.map(recipe => (
                <Card key={recipe._id} recipe={recipe} />
            ))}
        </div>
    )
}
