import React from 'react';
import axios from 'axios';
import Card from '../../components/card/Card';
import './home.css';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/loading/Loading';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const fetchRecipes = async ({ queryKey }) => {
    try {
        const [_, name] = queryKey;
        let query = 'http://localhost:3000/recipes';
        if (name) {
            query += `/name?name=${name}`;
        }
        console.log(query);
        const { data } = await axios.get(query);
        return data;
    } catch (error) {
        toast.error(`${error.response.data.message} (${error.response.status})`);
        throw new Error(error.response.data.message);
    }
}

export default function Home() {
    const { name } = useParams();
    const { data, error, isLoading } = useQuery({
        queryKey: ['recipes', name],
        queryFn: fetchRecipes
    });

    if (isLoading) return <Loading />;
    if (error) {
        toast.error(error.message);
        return <div>Error loading recipes</div>;
    }

    return (
        <div className='home'>
            {data.map(recipe => (
                <Card key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}
