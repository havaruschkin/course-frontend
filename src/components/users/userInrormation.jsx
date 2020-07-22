import React from "react";
import InlineEdit from 'react-edit-inplace';

const UserInformation = ({user, onInPlace}) => {
    if (user.email === undefined) return null;
    return (
        <div>
            <h2 className="text-lg-center" style={{marginBottom: "20px"}}>User information</h2>
            <span>Login: </span>{user.login}<br/>
            <span>Email: </span>
            <InlineEdit
                text={user.email}
                paramName="email"
                change={(data) => onInPlace(data)}
                style={{
                    backgroundColor: '#D1D1D1',
                    minWidth: 150,
                    display: 'inline-block',
                    margin: 0,
                    padding: 0,
                    fontSize: 15,
                    outline: 0,
                    border: 0
                }}/><br/>
            <span>Created: </span>{user.createdAt}<br/>
            <span>Status: </span>{user.status}<br/>
        </div>
    );
};

export default UserInformation;