import React from 'react'
import './recipe.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../components/loading/Loading'

const fetchRecipe = async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/recipes/${id}`)
        return data
    } catch (error) {
        toast.error(`${error.response.data.message} (${error.response.status})`)
    }
}

export default function Recipe() {
    const { id } = useParams()

    const { data, error, isLoading } = useQuery({ queryKey: ['recipe'], queryFn: fetchRecipe(id) })

    if (isLoading) return <Loading />
    if (error) toast.error(error.message)

    return (
        <div>{data.name}</div>
    )
}
