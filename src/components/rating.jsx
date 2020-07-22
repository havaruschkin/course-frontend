import React, {Component} from 'react';
import RatingView from "./common/ratingView";
import {getRatingComposition, getUserRating, isRating, saveRating} from "../services/ratingService";

class Rating extends Component {
    state = {
        ratingComposition: "",
        isRatingUser: "",
        userRating: ""
    };

    async componentDidMount() {
        const compositionId = this.props.compositionId;
        await this.initRating(compositionId)
    }

    initRating = async compositionId => {
        const {data: ratingComposition} = await getRatingComposition(compositionId);
        const {data: isRatingUser} = await isRating(compositionId);
        const {data: userRating} = await getUserRating(compositionId);
        this.setState({ratingComposition, isRatingUser, userRating});
    };

    handleClick = async choiceUser => {
        const compositionId = this.props.compositionId;
        const rating = {
            compositionId,
            rating: choiceUser
        };
        await saveRating(rating);
        await this.initRating(compositionId);
    };

    render() {
        const {isRatingUser, ratingComposition, userRating} = this.state;

        return (
            <div>
                {isRatingUser === false ?
                    <div>
                        <div className="text-center">Rate the composition</div>
                        <RatingView onClick={this.handleClick}/>
                    </div> :
                    <div className="text-center">
                        <div>Raiting composition:
                            <p className="badge badge-primary m-2">
                                {ratingComposition}
                            </p></div>
                        <div>Your rating of {userRating} stars</div>
                    </div>}
            </div>);
    }
}

export default Rating;