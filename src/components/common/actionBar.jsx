import React from "react";

const ActionBar = ({onLock, onUnlock, onDelete}) => {
    return (
        <div className="actionBarUsers">
            <i className="fa fa-lock m-3 clickable"
               aria-hidden="true"
               onClick={onLock}
               title="Lock"/>
            <i className="fa fa-unlock m-3 clickable"
               aria-hidden="true"
               onClick={onUnlock}
               title="Unlock"/>
            <i className="fa fa-trash m-3 clickable"
               aria-hidden="true"
               onClick={onDelete}
               title="Delete"/>
        </div>
    );
};

export default ActionBar;
