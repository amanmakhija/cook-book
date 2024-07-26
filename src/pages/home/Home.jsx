import React from 'react'
import axios from 'axios'
import Card from '../../components/card/Card'
import './home.css'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../components/loading/Loading'
import { toast } from 'react-toastify'

const fetchRecipes = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/recipes')
        return data
    } catch (error) {
        console.log(error)
    }
}

export default function Home() {
    const { data, error, isLoading } = useQuery({ queryKey: ['recipes'], queryFn: fetchRecipes })

    if (isLoading) return <Loading />
    if (error) toast.error(error.message)

    return (
        <div className='home'>
            {data.map(recipe => (
                <Card key={recipe.id} recipe={recipe} />
            ))}
        </div>
    )
}
