import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <React.Fragment>
            <h1>Fitness Tracker Homepage</h1>
            <nav>
                <ul>
                    <li>
                        <Link to='/api/activities'>Activities</Link>
                    </li>
                    <li>
                        <Link to='/api/routines'>Routines</Link>
                    </li>
                    
                </ul>
            </nav>
        <Link to='/api/users/register' className="button">Not a User? Register Here!</Link> <br />
        <Link to='/api/users/login' className="button">Already a User? Sign In Here!</Link>

        </React.Fragment>
        
    )
}

export default Home;