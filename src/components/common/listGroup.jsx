import React from "react";

const ListGroup = ({
                       items,
                       textProperty,
                       valueProperty,
                       onItemSelect,
                       selectedItem
                   }) => {
    return (
        <div style={{marginBottom: "40px"}}>
            <h2 style={{marginBottom: "40px"}} className="text-lg-center">
                Genres
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