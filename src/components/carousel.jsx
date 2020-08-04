import React, {useContext} from "react";
import {Carousel} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import LanguageContext from "../context/languageContext";

const CarouselCompositions = ({compositionsTop}) => {
    let {language} = useContext(LanguageContext);

    return (
        <div className="col mb-5">
            <h1 className="text-center mb-3">{language.carouselTitle}</h1>
            <Carousel>
                {compositionsTop.map(composition => (
                        <Carousel.Item key={composition.id}>
                            <NavLink to={`/compositionRead/${composition.id}`}>
                                {composition.urlImage === null ? (
                                    <img className="d-block w-100 img-fluid"
                                         alt="testAlt"
                                         src="http://via.placeholder.com/600x250?text=Placeholder"/>
                                ) : (
                                    <img className="d-block w-100 img-fluid"
                                         alt={composition.altImage}
                                         src={composition.urlImage}/>
                                )}
                                <Carousel.Caption>
                                    <h3>{composition.compositionName}</h3>
                                </Carousel.Caption>
                            </NavLink>
                        </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselCompositions;