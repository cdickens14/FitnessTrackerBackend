import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

const App = () => {
    const [activities, setActivities] = useState([]);
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        const getActivities = async () => {
            const response = await axios.get('/api/activities');
            console.log(response.data)
            setActivities(response.data);
        }
        getActivities();
    }, []);
    return (
        <React.Fragment>
            <h1>Fitness Tracker</h1>

            <ul>
                {
                    activities.map((activity, i) => {
                        return(
                            <li key={i}>{activity.name}</li>
                            
                        ) 
                    })
                }
            </ul>
        </React.Fragment>
        
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
