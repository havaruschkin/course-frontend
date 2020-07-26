import React, {Component} from 'react';
import ChapterTable from "./chapterTable";
import LanguageContext from "../../context/languageContext";
import {NavLink} from "react-router-dom";

class Chapters extends Component {
    static contextType = LanguageContext;

    state = {
        chapters: [],
        sortColumn: {path: 'title', order: 'asc'},
    };

    handleSort = sortColumn => {
        this.setState({sortColumn});
    };

    render() {
        const {sortColumn} = this.state;
        const {chapters} = this.props;

        return (
            <LanguageContext.Consumer>
                {languageContext => (
                    <div className="row">
                        <div className="col">
                            <hr/>
                            <NavLink to={`/compositions/${this.props.compositionId}/chapters/new`}>
                                <button className="btn btn-primary mb-3">
                                    {languageContext.language.addChapter}
                                </button>
                            </NavLink>
                            <div className="table-responsive">
                                <ChapterTable
                                    compositionId={this.props.compositionId}
                                    chapters={chapters}
                                    onSort={this.handleSort}
                                    sortColumn={sortColumn}/>
                            </div>
                        </div>
                    </div>
                )}
            </LanguageContext.Consumer>
        );
    }
}

export default Chapters;