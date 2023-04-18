import React, { useState } from 'react';
import axios from 'axios';

const MyRoutines = () => {
    const [routines, setRoutines] = useState([]);

    const baseURL = 'http://localhost:3000/api';
    const token = window.localStorage.getItem('token')
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`
  }
});

    const myRoutineList = async (username) => {
        const response = await authAxios.get(`/users/${username}/routines`, {
            name,
            description,
            activities
        });
        setRoutines(response.data)
        console.log(response.data)

    }

    return (
            routines.map((routine => {
                return (
                    <React.Fragment>
                        <li>{routine.name}</li>
                        <li>{routine.goal}</li>
                    </React.Fragment>
                )
            }))
        
    )
}

export default MyRoutines;