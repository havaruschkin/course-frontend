import React from "react";
import {NavLink} from "react-router-dom";

const ActionBarChapter = ({chapterId, compositionId, onDelete}) => {
    return (
        <div className="text-right">
            <NavLink to={`/compositions/${compositionId}/chapters/${chapterId}?key=${compositionId}`}>
                <i className="fa fa-pencil-square-o m-2 clickable"
                   aria-hidden="true"
                   title="Update chapter"/>
            </NavLink>
            <i className="fa fa-trash m-2 clickable"
               onClick={() => onDelete(chapterId)}
               aria-hidden="true"
               title="Delete chapter"/>
        </div>
    );
};

export default ActionBarChapter;
