import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

const signIn = async (event) => {
    event.preventDefault();
    const response = await axios.post('/api/users/login', {
        username,
        password
    });
    console.log(response.data);
    setUsername(response.data);
    setPassword(response.data);
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
            <form onSubmit={signIn}>
                <input type='text' name='username' onChange={onChange} value={username} placeholder='Username'></input>
                <input type='text' name='password' onChange={onChange}value={password} placeholder='Password'></input>
                <button>Login</button>
            </form>
        </React.Fragment>
    )
}

export default Login;