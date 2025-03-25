import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { UserContext } from '../context/user';

function SignUpForm() {

    const { setUser } = useContext(UserContext)

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username").min(2, 'Must be more than 1 character').max(15, 'Must be less than 15 characters.'),
        password: yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one uppercase, one lowercase, one number and one special character'
            )
            .required('Password is required'),
        confirm_password: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('You must confirm your password'),
        email: yup.string().required("Must enter email address"),
        first_name: yup.string().required("Must enter first name"),
        last_name: yup.string().required("Must enter last name"),
        profile_pic: yup.string().required("Must enter profile picture")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirm_password: "",
            email: "",
            first_name: "",
            last_name: "",
            profile_pic: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then((user) => {
                setUser(user)
            })
        },
    })



    return (
        <form className='editprofile-card' onSubmit={formik.handleSubmit}>
            <label>Username: </label>
            <input type='text' name='username' id='username' value={formik.values.username} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.username}</p>
            <label>Password: </label>
            <input type='password' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.password}</p>
            <label>Confirm Password:</label>
            <input type='password' name='confirm_password' id='confirm_password' value={formik.values.confirm_password} onChange={formik.handleChange} />
            <p style={{color: "red"}}>{formik.errors.confirm_password}</p>
            <label>Email: </label>
            <input type='text' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.email}</p>
            <label>First Name: </label>
            <input type='text' name='first_name' id='first_name' value={formik.values.first_name} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.first_name}</p>
            <label>Last Name: </label>
            <input type='text' name='last_name' id='last_name' value={formik.values.last_name} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.last_name}</p>
            <label>Profile Picture: </label>
            <input type='text' name='profile_pic' id='profile_pic' value={formik.values.profile_pic} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.profile_pic}</p>
            <button className='button' type='submit'>Sign Up</button>
        </form>
    )
}

export default SignUpForm;