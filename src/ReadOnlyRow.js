import React from 'react';

const ReadOnlyRow = ( { routine, handleEditClick, isLoggedIn }) => {
    return (
        <React.Fragment>
            <tr>
                <td>{routine.name}</td>
                <td>{routine.goal}</td>
                <td>{routine.creatorName}</td>
                <td>{routine.id}</td>
                {
                    isLoggedIn === true ?
                    <td>
                        <button type='button' onClick={(event) => handleEditClick(event, routine.name, routine.goal)}>Edit</button>
                    </td> : null
                }
            </tr>
        </React.Fragment>
    )
}

export default ReadOnlyRow;