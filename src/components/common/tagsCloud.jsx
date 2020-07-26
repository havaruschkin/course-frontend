import React, {useContext} from "react";
import LanguageContext from "../../context/languageContext";

const TagsCloud = ({tags, onItemSelect, selectedTag}) => {
    let {language} = useContext(LanguageContext);

    return (
        <div>
            <h2 style={{marginBottom: "40px"}} className="text-center">
                {language.tags} <i className="fa fa-tags" aria-hidden="true" style={{color: "red"}}/>
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