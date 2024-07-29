import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    profilePic: Yup.mixed().required('Profile picture is required')
});

export const loginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
});


export const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    instructions: Yup.string().required('Instructions are required'),
    ingredients: Yup.string().required('Ingredients are required')
});
