import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
    return (
        <React.Fragment>
            {
                isLoggedIn === false ? <Link to='/api/users/login' id="login">Login Here</Link>
                 : null
            }
            {
                isLoggedIn === false ? <Link to='/api/users/register' className='button'>Not a User? Register Here!</Link> : null
            }
            
            <Link to='/api/activities' className='link'>Go to Activities</Link>
            <Link to='/api/routines' className='link'>Go to Routines</Link>
            {
                isLoggedIn === true ? <Link to= '/api/users/:username/routines' className='link'>My Routines</Link> : null
            }
        </React.Fragment>
        
    )
}

export default Home;