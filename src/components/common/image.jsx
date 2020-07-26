import React, {useContext} from "react";
import {FileDrop} from "react-file-drop";
import LanguageContext from "../../context/languageContext";

const Image = ({urlImage, altImage, onImageUpload, onDeleteImage, onImageDownload}) => {
    let {language} = useContext(LanguageContext);

    return (
        <div style={{marginBottom: "30px"}}>
            {urlImage === null && (
                <div className="drop">
                    <FileDrop
                        onDrop={(files, event) =>
                            onImageUpload(files)}>
                        <label className="clickable">
                            <input className="file-upload m-3"
                                   type="file"
                                   multiple
                                   onChange={onImageDownload}
                            />
                            {language.image.drop}
                        </label>
                    </FileDrop>
                </div>
            )}
            {urlImage !== null && (
                <div className="row">
                    <img className="img-fluid" alt={altImage} src={urlImage}/>
                    <i className="fa fa-trash m-2 clickable fa-2x"
                       onClick={() => onDeleteImage()}
                       aria-hidden="true"
                       title="Delete image"/>
                </div>
            )}
        </div>

    );
};

export default Image;