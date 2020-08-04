import React, {Component} from "react";
import {getComposition} from "../../services/compositionService";
import CommentForm from "../comment/commentForm";
import Rating from "../rating";
import ChapterRead from "../chapter/chapterRead";
import {deleteChapter} from "../../services/chapterService";
import ChapterContents from "../chapterContents";
import LanguageContext from "../../context/languageContext";
import {NavLink} from "react-router-dom";
import _ from 'lodash';

class CompositionRead extends Component {
    static contextType = LanguageContext;

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
            rating: ""
        }
    };

    async componentDidMount() {
        const compositionId = this.props.match.params.id;
        const {data: composition} = await getComposition(compositionId);
        this.setState({data: composition});
    }

    handleDelete = async chapterId => {
        const compositionId = this.props.match.params.id;
        await deleteChapter(chapterId);
        const {data: composition} = await getComposition(compositionId);
        this.setState({data: composition});
    };

    handleChapterSelect = chapter => {
        this.setState({chapterSelect: chapter})
    };

    render() {
        const {data, chapterSelect} = this.state;
        const {user: currentUser} = this.props;
        const sortedChapter = _.orderBy(data.chapters, "id", "asc");

        return (
            <LanguageContext.Consumer>
                {languageContext => (
                    <React.Fragment>
                        <h1 className="text-center">{data.compositionName}</h1>
                        <h6 className="text-center">{data.description}</h6>
                        <div className="text-center mb-4">
                            <img className="img-fluid"
                                 alt={data.altImage}
                                 src={data.urlImage}/>
                        </div>
                        <ChapterContents
                            chapters={sortedChapter}
                            onChapterSelect={this.handleChapterSelect}/>
                        <div className="text-center mb-4">
                            {currentUser && currentUser.sub === data.user.login && (
                                <NavLink
                                    to={`/compositions/${this.props.match.params.id}/chapters/new?key=${this.props.match.params.id}`}>
                                    {languageContext.language.addChapter}
                                </NavLink>
                            )}
                        </div>
                        {chapterSelect && (
                            <div className="jumbotron mb-0">
                                    <ChapterRead chapter={chapterSelect}
                                                 currentUser={currentUser}
                                                 compositionUser={data.user}
                                                 compositionId={this.props.match.params.id}
                                                 onDelete={this.handleDelete}/>
                            </div>
                        )}
                        <div className="jumbotron">
                            {currentUser && (
                                <Rating compositionId={this.props.match.params.id}/>
                            )}
                            {!currentUser && (
                                <div className="text-center">
                                    {languageContext.language.rating.ratingComposition}
                                    <p className="badge badge-primary m-2">
                                        {data.rating}
                                    </p>
                                </div>
                            )}
                            <div className="text-right">
                                <small>{languageContext.language.created}{data.createdAt}</small><br/>
                                <small>{languageContext.language.updated}{data.updatedAt}</small><br/>
                            </div>
                        </div>
                        {currentUser && (
                            <CommentForm compositionId={this.props.match.params.id}
                                         user={currentUser}/>
                        )}
                    </React.Fragment>
                )}
            </LanguageContext.Consumer>
        );
    }
}

export default CompositionRead;