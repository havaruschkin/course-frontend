import React from "react";
import {FileDrop} from "react-file-drop";

const Image = ({urlImage, altImage, onImageUpload, onDeleteImage}) => {
    const styles = {border: '1px solid black', width: 600, color: 'black', padding: 20};

    return (
        <div style={{marginBottom: "30px"}}>
            {urlImage === null && (
                <div style={styles}>
                    <FileDrop
                        onDrop={(files, event) =>
                            onImageUpload(files)}>
                        Drop image here!
                    </FileDrop>
                </div>
            )}
            {urlImage !== null && (
                <div className="row">
                    <img alt={altImage} src={urlImage}/>
                    <i className="fa fa-trash m-2 clickable"
                       onClick={() => onDeleteImage()}
                       aria-hidden="true"
                       title="Delete image"/>
                </div>
            )}
        </div>
    );
};

export default Image;