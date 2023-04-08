import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
 const [user, setUser] = useState({});
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

const registerUser = async (event, token) => {
    event.preventDefault();
        const response = await axios.post('/api/users/register', {
            username,
            password
        });
        setUser(user, response.data);
        console.log(response.data)
        window.localStorage(`token, ${token}`)
    
}

const onChange = (event) => {
if (event.target.name === 'username') {
    setUsername(event.target.value)
} else {
    setPassword(event.target.value)
}
}
    return (
        <React.Fragment>
            <form onSubmit={ () => registerUser }>
                <input type='text' name='username' onChange={onChange} value={username} placeholder='Create Username' ></input>
                <input type='text' name='password' onChange={onChange} value={password} placeholder ='Create Password'></input>
                <button>Register Here</button>
            </form>
        </React.Fragment>
    )
}

export default Register;