import React, {useContext} from 'react';
import LanguageContext from "../../context/languageContext";
import {NavLink} from "react-router-dom";

const CompositionCard = ({sortedCompositions}) => {
    let {language} = useContext(LanguageContext);

    return (
        <div className="row">
            {sortedCompositions.map(composition => (
                <div key={composition.id} className="col-lg-6 col-md-12">
                    <NavLink to={`/compositionRead/${composition.id}`}>
                        <div className="card mb-5 ">
                            <h3 className="card-title text-center">{composition.compositionName}</h3>
                            {composition.urlImage === null ? (
                                <img
                                    className="card-img-top"
                                    alt="testAlt"
                                    src="http://via.placeholder.com/600x250?text=Placeholder"/>
                            ) : (
                                <img
                                    className="card-img-top"
                                    alt={composition.altImage}
                                    src={composition.urlImage}/>
                            )}
                            <div className="card-body">
                                <p>{composition.description}</p>
                                {composition.tags.length !== 0 && (
                                    <i className="fa fa-tags" style={{color: "red"}} aria-hidden="true"/>
                                )}
                                {composition.tags.map(tag => (
                                    <div key={tag.id} className="badge badge-secondary m-1">
                                        {tag.name}
                                    </div>
                                ))}
                                <div className="text-right">
                                    {language.created}
                                    {composition.createdAt}
                                </div>
                                <div className="text-right">
                                    {language.updated}
                                    {composition.updatedAt}
                                </div>
                            </div>
                        </div>
                    </NavLink>
                </div>
            ))}
        </div>
    );
};

export default CompositionCard;