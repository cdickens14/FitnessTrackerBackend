import React, { useEffect, useState } from "react";
import axios from "axios";

const Activities = ({ isLoggedIn }) => {
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getActivities = async () => {
      const response = await axios.get('/api/activities');
      setActivities(response.data);
    };
    getActivities();
  }, []);

  const onChange = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else {
      setDescription(event.target.value);
    }
  };

  const createActivity = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('/api/activities', {
            name,
            description
            
        });
        setActivities([...activities, response.data]);
        console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  };

    return (
        <React.Fragment>
            <h1>Activities</h1>
                {
                    activities.map((activity, i) => {
                        return(
                            <table>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{activity.name}</td>
                                  <td>{activity.description}</td>
                                </tr>
                              </tbody>
                            </table> 
                     
                            
                        ) 
                    })
                }
                {
                  isLoggedIn === true ? 
                  <form onSubmit={ createActivity }>
                    <input type='text' name='name' onChange={onChange} value={name} placeholder='Name of Activity'></input>
                    <input type='text' name='description' onChange={onChange} value={description} placeholder='Description of Activity'></input>
                    <button>Create Activity</button>
                  </form> : null
                }
            


        </React.Fragment>
    )
   
}

export default Activities;
