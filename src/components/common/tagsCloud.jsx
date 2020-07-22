import React from "react";

const TagsCloud = ({tags, onItemSelect, selectedTag}) => {
    return (
        <div>
            <h2 style={{marginBottom: "40px"}} className="text-lg-center">
                Tags <i className="fa fa-tags" aria-hidden="true" style={{color: "red"}}/>
            </h2>
            {tags.map(tag => (
                <div key={tag.id}
                     className={tag === selectedTag ?
                         "badge badge-info m-1 clickable" : "badge badge-secondary m-1 clickable"}
                     onClick={() => onItemSelect(tag)}>
                    {tag.name}
                </div>
            ))}
        </div>
    );
};

export default TagsCloud;