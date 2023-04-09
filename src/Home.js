import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

const Home = () => {
    return (
        <React.Fragment>
            <h1>Fitness Tracker Homepage</h1>
            <Login />
            <Link to='/api/users/register' className='button'>Not a User? Register Here!</Link>
            <div>
                <Link to='/api/activities' className='link'>Go to Activities</Link>
                <Link to='/api/routines' className='link'>Go to Routines</Link>
            </div>
        </React.Fragment>
        
    )
}

export default Home;