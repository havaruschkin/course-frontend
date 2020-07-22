import React, {Component} from 'react';
import Like from "../common/like";
import {getCountLikes, isLike, saveLike} from "../../services/likeServise";

class CounterLike extends Component {
    state = {
        countLikes: "",
        liked: ""
    };

    async componentDidMount() {
        const chapter = this.props.chapter;
        const countLikes = await getCountLikes(chapter.id);
        const liked = await isLike(chapter.id);
        this.setState({countLikes: countLikes.data, liked: liked.data});
    }

    handleLike = async () => {
        const chapterId = this.props.chapter.id;
        await saveLike(chapterId);
        this.state.liked ? this.decrement() : this.increment()
    };

    increment = () => {
        this.setState({countLikes: this.state.countLikes + 1, liked: true});
    };

    decrement = () => {
        this.setState({countLikes: this.state.countLikes - 1, liked: false});
    };

    render() {
        const {countLikes, liked} = this.state;
        return (
            <div className="text-center">
                <span className="m-2">{countLikes}</span>
                <Like
                    onClick={this.handleLike}
                    liked={liked}
                />
            </div>
        );
    }
}

export default CounterLike;