import React, { useState, useEffect } from "react";
import axios from "axios";
import ReadOnlyRow from "./ReadOnlyRow";
import EditRow from './EditRow';

const Routines = ({ isLoggedIn }) => {
  const [routines, setRoutines] = useState([]);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [editRoutine, setEditRoutine] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    goal: ''
  });
 

  useEffect(() => {
    const getRoutines = async () => {
      const response = await axios.get('/api/routines');
      console.log(response.data);
      setRoutines(response.data);
    };
    getRoutines();
  }, []);

  const onChange = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else {
      setGoal(event.target.value);
    }
  };

const baseURL = 'http://localhost:3000/api';
const token = window.localStorage.getItem('token')
const authAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const createRoutine = async (event) => {
    event.preventDefault();
        try {
            const response = await authAxios.post('/routines', {
                name,
                goal
                
            });
            setRoutines([...routines, response.data]);
            console.log(response.data);
        } catch (err) {
          console.error(err);
        }
}

const handleEditClick = (event, name, goal) => {
  event.preventDefault();
  setEditRoutine(name, goal);

  const formValues = {
    name: name,
    goal: goal
  }
  setEditFormData(formValues);
}

const handleEditFormChange = (event) => {
  event.preventDefault();
  const fieldName = event.target.getAttribute('name');
  const fieldValue = event.target.value;
  const newFormData = {...editFormData};
  newFormData[fieldName] = fieldValue;
  setEditFormData(newFormData);

}

const handleEditFormSubmit = (event) => {
  event.preventDefault();

  const editedRoutine = {
    id: editFormData.id,
    name: editFormData.name,
    goal: editFormData.goal
  }
  const newRoutines = [...routines];
  const index = routines.findIndex((routine) => routine.id === editRoutine.id)
  newRoutines[index] = editedRoutine;
  setRoutines(newRoutines);
}

  return (
    <React.Fragment>
        <h1>Routines</h1>
         <ul>
            {
                routines.map((routine, i) => {
                    return (
                        <React.Fragment>
                          <form onSubmit={handleEditFormSubmit}>
                            <table>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Goal</th>
                                  <th>CreatorName</th>
                                  <th>Routine Id</th>
                                </tr>
                              </thead>
                              <tbody>
                                { editRoutine === routine.name ? (
                                  <EditRow editFormData={editFormData} handleEditFormChange={handleEditFormChange}/>
                                ) : (
                                  <ReadOnlyRow isLoggedIn={isLoggedIn} routine={routine} handleEditClick={handleEditClick}/>
                                )}
                              </tbody>
                            </table> 
                          </form>
                            
                        </React.Fragment>
                        
                        
                    ) 
                })
            }
         </ul>
         {
          isLoggedIn === true ? 
          <form onSubmit={ createRoutine }>
            <input type='text' name='name' onChange={onChange} value={name} placeholder='Name of Routine'></input>
            <input type='text' name='goal' onChange={onChange} value={goal} placeholder='Goal'></input>
            <button onClick={ createRoutine }>Create Routine</button>
          </form> : null
         }
        
    </React.Fragment>
  );
};

export default Routines;
