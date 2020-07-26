import React from "react";

const Like = props => {
    let classes = "fa clickable fa-heart";
    if (!props.liked) classes += "-o";
    return (
        <i className={classes}
           style={{color: "red"}}
           aria-hidden="true"
           onClick={props.onClick}
        />
    );
};

export default Like