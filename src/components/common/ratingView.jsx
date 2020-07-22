import React from 'react';

const RatingView = ({onClick}) => {
        const classes = "fa clickable fa-star";

        return (
            <div className="rating">
                <i className={classes} aria-hidden="true"
                   onClick={() => onClick(5)}
                />
                <i className={classes} aria-hidden="true"
                   onClick={() => onClick(4)}
                />
                <i className={classes} aria-hidden="true"
                   onClick={() => onClick(3)}
                />
                <i className={classes} aria-hidden="true"
                   onClick={() => onClick(2)}
                />
                <i className={classes} aria-hidden="true"
                   onClick={() => onClick(1)}
                />
            </div>
        );
};

export default RatingView;