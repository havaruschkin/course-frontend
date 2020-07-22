import React, {Component} from "react";
import {getComposition} from "../../services/compositionService";
import CommentForm from "../comment/commentForm";
import Rating from "../rating";
import ChapterRead from "../chapter/chapterRead";
import {getRatingComposition} from "../../services/ratingService";
import {deleteChapter} from "../../services/chapterService";
import ChapterContents from "../chapterContents";

class CompositionRead extends Component {
    state = {
        data: {
            id: "",
            compositionName: "",
            description: "",
            createdAt: "",
            updatedAt: "",
            genre: {
                genreName: ""
            },
            chapters: [],
            comments: [],
            user: {},
            ratingComposition: ""
        }
    };

    async componentDidMount() {
        const compositionId = this.props.match.params.id;
        const {data: ratingComposition} = await getRatingComposition(compositionId);
        const {data: composition} = await getComposition(compositionId);
        this.setState({data: composition, ratingComposition});
    }

    handleUpdate = chapterId => {
        window.location = `/compositions/${this.props.match.params.id}
        /chapters/${chapterId}?key=${this.props.match.params.id}`;
    };

    handleCreate = () => {
        window.location = `/compositions/${this.props.match.params.id}
        /chapters/new?key=${this.props.match.params.id}`;
    };

    handleDelete = async chapterId => {
        const compositionId = this.props.match.params.id;
        await deleteChapter(chapterId);
        const {data: composition} = await getComposition(compositionId);
        this.setState({data: composition});
    };

    render() {
        const {data, ratingComposition} = this.state;
        const {user: currentUser} = this.props;

        return (
            <React.Fragment>
                <div className="text-lg-right">
                    {currentUser && currentUser.sub === data.user.login && (
                        <button className="btn btn-outline-primary"
                                onClick={this.handleCreate}>
                            <i className="fa fa-plus m-2" aria-hidden="true"/>Add chapter
                        </button>
                    )}
                </div>
                <h1 className="text-center">{data.compositionName}</h1>
                <h6 className="text-center">{data.description}</h6>
                <img style={{marginBottom: "30px"}}
                     alt={data.altImage}
                     src={data.urlImage}/>
                <ChapterContents chapters={data.chapters}/>
                <div className="jumbotron">
                    <ChapterRead chapters={data.chapters}
                                 currentUser={currentUser}
                                 compositionUser={data.user}
                                 onUpdate={this.handleUpdate}
                                 onDelete={this.handleDelete}/>
                    {currentUser && (
                        <Rating compositionId={this.props.match.params.id}/>
                    )}
                    {!currentUser && (
                        <div className="text-center">
                            Rating composition:
                            <p className="badge badge-primary m-2">
                                {ratingComposition}
                            </p>
                        </div>
                    )}
                    <div className="text-lg-right">
                        <small>Composition created: {data.createdAt}</small><br/>
                        <small>Last updated: {data.updatedAt}</small><br/>
                    </div>
                </div>
                {currentUser && (
                    <CommentForm compositionId={this.props.match.params.id}
                                 user={currentUser}/>
                )}
            </React.Fragment>
        );
    }
}

export default CompositionRead;