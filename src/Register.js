import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
 const [user, setUser] = useState({});
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 useEffect(() => {
    const registerUser = () => {
        const response = axios.post('/users/register');
        console.log(response.data)
        setUser(response.data);
    }
    registerUser();
 })

 const onChange = (event) => {
    if (event.target.name = username) {
        setUsername(event.target.value)
    }
 }
    return (
        <React.Fragment>
            <form>
                <input type='text' name='user' value={username} placeholder='Create Username' ></input>
                <input type='text' name='password' value={password} placeholder ='Create Password'></input>
                <button>Register Here</button>
            </form>
        </React.Fragment>
    )
}

export default Register;