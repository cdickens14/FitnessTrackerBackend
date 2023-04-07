import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Routines = () => {
    const [routines, setRoutines] = useState([]);
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');

    useEffect(() => {
        const getRoutines = async () => {
        const response = await axios.get('/api/routines');
        console.log(response.data)
        setRoutines(response.data);
    }
    getRoutines();
}, []);

const onChange = (event) => {
    if(event.target.name === 'name') {
        setName(event.target.value);
    } else {
        setGoal(event.target.value);
    }
}

const createRoutine = async(event) => {
    event.preventDefault();
    try {
        const response = await axios.post('/api/routines', {
            name,
            goal
            
        });
        setRoutines([...routines, response.data]);
    } catch (err) {
      console.log (err);
    }
}

return (
    <React.Fragment>
        <h1>Routines</h1>
         <ul>
            {
                routines.map((routine, i) => {
                    return(
                        <li key={i}>{routine.name} <br />
                        {routine.goal} </li>
                        
                    ) 
                })
            }
            <form onSubmit={ createRoutine }>
                <input type='text' name='name' onChange={onChange} value={name} placeholder='Name of Routine'></input>
                <input type='text' name='goal' onChange={onChange} value={goal} placeholder='Goal'></input>
                <button>Create Routine</button>
            </form>
        </ul>



    </React.Fragment>
)

}

export default Routines;