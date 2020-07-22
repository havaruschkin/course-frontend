import React, {Component} from 'react';
import ChapterTable from "./chapterTable";

class Chapters extends Component {
    state = {
        chapters: [],
        sortColumn: {path: 'title', order: 'asc'},
    };

    handleUpdate = chapters => {
        window.location = `/compositions/${this.props.compositionId}/chapters/${chapters.id}`;
    };

    handleCreate = () => {
        window.location = `/compositions/${this.props.compositionId}/chapters/new`;
    };

    handleSort = sortColumn => {
        this.setState({sortColumn});
    };

    render() {
        const {sortColumn} = this.state;
        const {chapters} = this.props;

        return (
            <div className="row">

                <div className="col">
                    <button
                        onClick={this.handleCreate}
                        className="btn btn-primary"
                        style={{marginBottom: 20}}
                    >
                        Add Chapter
                    </button>
                    <ChapterTable
                        chapters={chapters}
                        onUpdate={this.handleUpdate}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}/>
                </div>
            </div>
        );
    }
}

export default Chapters;