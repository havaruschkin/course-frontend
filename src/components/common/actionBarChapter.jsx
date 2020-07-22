import React from "react";

const ActionBarChapter = ({chapterId, onUpdate, onDelete}) => {
    return (
        <div className="text-lg-right">
            <i className="fa fa-pencil-square-o m-2 clickable"
               onClick={() => onUpdate(chapterId)}
               aria-hidden="true"
               title="Update chapter"/>
            <i className="fa fa-trash m-2 clickable"
               onClick={() => onDelete(chapterId)}
               aria-hidden="true"
               title="Delete chapter"/>
        </div>
    );
};

export default ActionBarChapter;
