import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');

const handleSubmit = (event) => {
    event.preventDefault();
}
const signIn = async () => {
    try {
        const response = await axios.post('/api/users/login', {
            username,
            password
        });
        const result = await response.data;
        console.log(result);
        props.setIsLoggedIn === true;
        // if (data.user) {
        //     await window.localStorage.setItem('token', data.token);
        //     await setUser({
        //         ...user,
        //         token: data.token,
        //         userId: data.user.id
        //     });
        // }
        
        return result
      } catch (err) {
        console.error(err);
      }
    
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
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' onChange={onChange} value={username} placeholder='Username'></input>
                <input type='text' name='password' onChange={onChange} value={password} placeholder='Password'></input>
                <button type ='submit' onClick={() => signIn()}>Login</button>
            </form>
           

        </React.Fragment>
    )
}

export default Login;