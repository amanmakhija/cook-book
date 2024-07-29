import React from 'react';
import './recipe.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../../components/loading/Loading';

const fetchRecipe = async ({ queryKey }) => {
    const [_, id] = queryKey;
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`http://localhost:3000/recipes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        return data;
    } catch (error) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
        throw new Error(error.response.data.message);
    }
};

export default function Recipe() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, error, isLoading } = useQuery({
        queryKey: ['recipe', id],
        queryFn: fetchRecipe
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.delete(`http://localhost:3000/recipes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
                toast.success('Recipe deleted successfully');
                return data;
            } catch (error) {
                toast.error(`${error.response.data.message} (${error.response.status})`);
                throw new Error(error.response.data.message);
            }
        },
        onSuccess: () => {
            navigate('/');
        },
    });

    if (isLoading) return <Loading />;

    if (error) {
        toast.error(error.message);
        return <div>Error loading recipe</div>;
    }

    console.log(data);

    const deleteRecipe = (e) => {
        e.preventDefault();
        deleteMutation.mutate();
    };

    return (
        <>
            {data && (
                <div className='recipe'>
                    <div className='recipe-container'>
                        <div className='recipe-img' style={{ backgroundImage: `url(${data.thumbnail})` }}></div>
                        <h1>{data.name}</h1>
                        <span>Ingredients: {data.ingredients}</span>
                    </div>
                    <div className='recipe-container'>
                        <div className='recipe-info'>
                            <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
                        </div>
                    </div>
                    <button onClick={deleteRecipe} className='delete-btn'>Delete</button>
                </div>
            )}
        </>
    );
}
