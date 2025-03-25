import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user';
import { CommentContext } from '../context/comment';


function LoginForm() {

    const { setUser } = useContext(UserContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user)
                });
            } else {
                // Check if response has content before parsing
                if (r.headers.get('content-length') > 0) {
                    r.json().then((err) => {
                        console.log(err);
                        setErrors([err.error]);
                    });
                } else {
                    // Handle cases where there's no response body
                    console.error("No response body");
                    setErrors(["An unexpected error occurred"]);
                }
        }}).catch((error) => {
            console.error("Fetch error:", error);
            setErrors(["Network error"]);
        });
    }

    return (
        <form className='editprofile-card' onSubmit={handleSubmit}>
            <label for="username">Username: </label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <br></br>
            <br></br>
            <label for="password">Password: </label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br></br>
            <input className='button' type="submit" value="Login"/>
            {errors.map((err) => (
                <p key={err}>{err}</p>
        ))}
        </form>
    )
}

export default LoginForm;