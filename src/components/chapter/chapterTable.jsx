import React, {Component} from "react";
import Table from "../common/table/table";
import {NavLink} from "react-router-dom";

class ChapterTable extends Component {
    columns = [
        {path: 'chapterName', label: "Title"},
        {
            key: "buttons",
            content: chapter => (
                <NavLink to={`/compositions/${this.props.compositionId}/chapters/${chapter.id}`}>
                    <button className="btn btn-primary btn-sm">
                        Update
                    </button>
                </NavLink>
            )
        }
    ];

    render() {
        const {chapters, sortColumn, onSort} = this.props;

        return (
            <Table
                columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
                data={chapters}
            />
        );
    }
}

export default ChapterTable;