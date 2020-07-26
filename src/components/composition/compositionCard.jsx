import React, {useContext} from 'react';
import {Card, CardBody, ImageHeader} from "react-simple-card";
import LanguageContext from "../../context/languageContext";
import {NavLink} from "react-router-dom";

const CompositionCard = ({sortedCompositions}) => {
    let {language} = useContext(LanguageContext);

    return (
        <div>
            {sortedCompositions.length === 0 &&
            <h2 className="text-center">No compositions!</h2>}
            {sortedCompositions.map(composition => (
                <div style={{marginBottom: "40px"}} key={composition.id}>
                    <h3 className="text-center">
                        {composition.compositionName}
                    </h3>
                    <NavLink to={`/compositionRead/${composition.id}`}>
                        <div className="clickable hoverable">
                            <Card>
                                {composition.urlImage === null ? (
                                    <ImageHeader
                                        alt="testAlt"
                                        imageSrc="http://via.placeholder.com/600x250?text=Placeholder"/>
                                ) : (
                                    <ImageHeader
                                        alt={composition.altImage}
                                        imageSrc={composition.urlImage}/>
                                )}
                                <CardBody>
                                    <p>{composition.description}</p>
                                    <i className="fa fa-tags" aria-hidden="true"/>
                                    {composition.tags.map(tag => (
                                        <div key={tag.id} className="badge badge-secondary m-1">
                                            {tag.name}
                                        </div>
                                    ))}
                                </CardBody>
                            </Card>
                        </div>
                    </NavLink>
                    <div className="text-right">
                        {language.created}
                        {composition.createdAt}
                    </div>
                    <div className="text-right">
                        {language.updated}
                        {composition.updatedAt}
                    </div>
                </div>
            ))}
        </div>


    );
};

export default CompositionCard;