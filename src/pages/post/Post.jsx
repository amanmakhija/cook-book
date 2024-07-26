import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './post.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function Post() {
    const navigate = useNavigate();
    const [instructions, setInstructions] = useState('');
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');

    const postMutation = useMutation({
        mutationFn: async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.post('http://localhost:3000/recipes', { name: title, description: instructions, ingredients }, { headers: { Authorization: `Bearer ${token}` } });
                return data;
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        postMutation.mutate();
        toast.success('Recipe posted successfully');
        navigate('/');
    }

    return (
        <div className='editor'>
            <h1 className='title'>Create a Recipe</h1>
            <form>
                <div>
                    <label>Image</label>
                    <input type="file" id="fileInput" />
                </div>
                <div>
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Name of Recipe" />
                </div>
                <div className='instructions'>
                    <label>Instructions</label>
                    <ReactQuill className='react-quill' theme="snow" value={instructions} onChange={setInstructions} />
                </div>
                <div>
                    <label>Ingredients</label>
                    <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} type="text" placeholder="Enter Ingredients" />
                </div>
                <button onClick={handleSubmit} type='submit'>Post</button>
            </form>
        </div>
    )
}