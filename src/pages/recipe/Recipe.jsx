import React from 'react'
import './recipe.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../components/loading/Loading'

const fetchRecipe = async ({ queryKey }) => {
    const [_, id] = queryKey
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get(`http://localhost:3000/recipes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        console.log(data);
        return data
    } catch (error) {
        toast.error(`${error.response.data.message} (${error.response.status})`)
    }
}

export default function Recipe() {
    const { id } = useParams()

    const { data, error, isLoading } = useQuery({ queryKey: ['recipe', id], queryFn: fetchRecipe })

    if (isLoading) return <Loading />
    if (error) toast.error(error.message)

    return (
        <>
            {data && (
                <div className='recipe'>
                    <div className='recipe-container'>
                        <div className='recipe-img' style={{ background: `url('${data.thumbnail}')` }}></div>
                        <span>Ingredients: {data.ingredients}</span>
                    </div>
                    <div className='recipe-container'>
                        <div className='recipe-info'>
                            <h1>{data.name}</h1>
                            <p>{data.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
