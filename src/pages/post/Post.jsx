import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './post.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import validationSchema from '../../utils/validation';

export default function Post() {
    const navigate = useNavigate();
    const [instructions, setInstructions] = useState('');

    const postMutation = useMutation({
        mutationFn: async (values) => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.post('http://localhost:3000/recipes', { name: values.title, description: instructions, ingredients: values.ingredients }, { headers: { Authorization: `Bearer ${token}` } });
                return data;
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    });

    const handleSubmit = (values) => {
        postMutation.mutate(values, {
            onSuccess: () => {
                toast.success('Recipe posted successfully');
                navigate('/');
            }
        });
    }

    return (
        <div className='editor'>
            <h1 className='title'>Create a Recipe</h1>
            <Formik
                initialValues={{ title: '', ingredients: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div>
                            <label>Image</label>
                            <input type="file" id="fileInput" />
                        </div>
                        <div>
                            <label>Title</label>
                            <Field name="title" type="text" placeholder="Name of Recipe" />
                            <ErrorMessage name="title" component="div" className="error" />
                        </div>
                        <div className='instructions'>
                            <label>Instructions</label>
                            <ReactQuill className='react-quill' theme="snow" value={instructions} onChange={(value) => {
                                setInstructions(value);
                                setFieldValue('instructions', value);
                            }} />
                            <ErrorMessage name="instructions" component="div" className="error" />
                        </div>
                        <div>
                            <label>Ingredients</label>
                            <Field name="ingredients" type="text" placeholder="Enter Ingredients" />
                            <ErrorMessage name="ingredients" component="div" className="error" />
                        </div>
                        <button type='submit'>Post</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
