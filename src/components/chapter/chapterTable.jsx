import React, {Component} from "react";
import Table from "../common/table/table";

class ChapterTable extends Component {
    columns = [
        {path: 'chapterName', label: "Title"},
        {
            key: "buttons",
            content: chapter => (
                <div className="btn-group m-1">
                    <button
                        onClick={() => this.props.onUpdate(chapter)}
                        className="btn btn-primary btn-sm"
                    >
                        Update
                    </button>
                </div>
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