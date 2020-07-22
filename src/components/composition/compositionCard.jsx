import React from 'react';
import {Card, ImageHeader, CardBody} from "react-simple-card";

const CompositionCard = ({sortedCompositions, onClick}) => {
    return (
        <div>
            {sortedCompositions.length === 0 &&
            <h2 className="text-center">No compositions!</h2>}
            {sortedCompositions.map(composition => (
                <div key={composition.id}>
                    <div style={{marginBottom: "40px"}}
                         onClick={() => onClick(composition.id)}
                         className="clickable">
                        <h3 className="text-center">
                            {composition.compositionName}
                        </h3>
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
                        <div className="text-lg-right">Created: {composition.createdAt}</div>
                        <div className="text-lg-right">Last updated: {composition.updatedAt}</div>
                    </div>
                </div>
            ))}
        </div>


    );
};

export default CompositionCard;