import React, {useContext} from "react";
import LanguageContext from "../../context/languageContext";

const ListGroup = ({
                       items,
                       textProperty,
                       valueProperty,
                       onItemSelect,
                       selectedItem
                   }) => {
    let {language} = useContext(LanguageContext);

    return (
        <div style={{marginBottom: "40px"}}>
            <h2 style={{marginBottom: "40px"}} className="text-center">
                {language.genres}
            </h2>
            <ul className="list-group">
                {items.map(item => (
                    <li onClick={() => onItemSelect(item)}
                        key={item[valueProperty]}
                        className={item === selectedItem ?
                            "list-group-item clickable active" : "list-group-item clickable"}>
                        {item[textProperty]}
                    </li>))}
            </ul>
        </div>
    );
};

ListGroup.defaultProps = {
    textProperty: "genreName",
    valueProperty: "id"
};

export default ListGroup;