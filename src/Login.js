import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home';


const Login = ({ setIsLoggedIn, isLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');

const signIn = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('/api/users/login', {
            username,
            password
        });
        const result = await response.data;
        console.log(result);
        setUser(response.data)
        setIsLoggedIn(true);
        window.localStorage.setItem('token', response.data.token);
      } catch (err) {
        console.error(err);
      }
    
}


const onChange = (event) => {
    if (event.target.name === 'username') {
        setUsername(event.target.value)
    } else {
      setPassword(event.target.value);
    }
    }
    return (
        <React.Fragment>
            <form onSubmit={signIn}>
                <input type='text' name='username' onChange={onChange} value={username} placeholder='Username'></input>
                <input type='text' name='password' onChange={onChange} value={password} placeholder='Password'></input>
                <button type ='submit'>Login</button>
            </form>
           
        </React.Fragment>
    )
}

export default Login;
