import React, { useState } from 'react';
import axios from 'axios';

const EditRow = ({ editFormData, handleEditFormChange }) => {
    const [routines, setRoutines] = useState([]);

    const baseURL = 'http://localhost:3000/api';
    const token = window.localStorage.getItem('token')
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const deleteRoutine = async (routineId) => {
        try {
          const response = await authAxios.delete(`/routines/${routineId}`)
          setRoutines(routineId);
          console.log(response);
        } catch (err) {
          console.error(err);
        }
      };
    return (
        <React.Fragment>
                <tr>
                    <td>
                        <input type='text' name='name' placeholder='Edit Name' value={editFormData.name}onChange={handleEditFormChange}></input>
                    </td>
                    <td>
                        <input type='text' name='goal' placeholder='Edit Goal' value={editFormData.goal}onChange={handleEditFormChange}></input>
                    </td>
                    <td>
                        <button type='submit'>Save</button>
                        <button onClick={deleteRoutine}>Delete</button>
                    </td>
                
                </tr> 
            
        </React.Fragment>
    )
}

export default EditRow;