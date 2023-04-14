import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <React.Fragment>
            <Link to='/api/users/login' id="login">Login Here</Link>
            <Link to='/api/users/register' className='button'>Not a User? Register Here!</Link>
            <Link to='/api/activities' className='link'>Go to Activities</Link>
            <Link to='/api/routines' className='link'>Go to Routines</Link>
        
        </React.Fragment>
        
    )
}

export default Home;