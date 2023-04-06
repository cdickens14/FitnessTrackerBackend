import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';

const Activities = () =>{
    const [activities, setActivities] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const getActivities = async () => {
        const response = await axios.get('/api/activities');
        // console.log(response.data)
        setActivities(response.data);
    }
    getActivities();
}, []);

const onChange = (event) => {
    if(event.target.name === 'name') {
        setName(event.target.value);
    } else {
        setDescription(event.target.value);
    }
}

const createActivity = async(event) => {
    event.preventDefault();
    try {
        const newActivity = await axios.post('/api/activities', {
            name,
            description
            
        });
        setActivities([...activities, response.data]);
        console.log(response.data)
    } catch (err) {
      console.log (err);
    }
}


    return (
        <React.Fragment>
            <h1>Activities</h1>
                {
                    activities.map((activity, i) => {
                        return(
                            <li key={i}>{activity.name} <br />   
                            {activity.description} 
                            </li> 
                     
                            
                        ) 
                    })
                }
            <form onSubmit={ createActivity }>
                <input type='text' name='name' onChange={onChange} value={name} placeholder='Name of Activity'></input>
                <input type='text' name='description' onChange={onChange} value={description} placeholder='Description of Activity'></input>
                <button>Create Activity</button>
            </form>


        </React.Fragment>
    )
   
}

export default Activities;