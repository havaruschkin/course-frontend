import React, {Component} from "react";
import Table from "../common/table/table";
import {Link} from "react-router-dom";
import auth from "../../services/authService";

class CompositionsTable extends Component {
    columns = [
        {
            path: 'compositionName',
            label: 'Title',
            content: composition => (
                <Link to={`/compositionRead/${composition.id}`}
                title="To read">
                    {composition.compositionName}
                </Link>)
        },
        {path: 'genre.genreName', label: 'Genre'},
        {path: 'updatedAt', label: 'Last updated'}
    ];

    buttonColumn = {
        key: "buttons",
        content: composition => (
            <div>
                <i className="fa fa-pencil-square-o m-2 clickable"
                   onClick={() => this.props.onUpdate(composition)}
                   aria-hidden="true"
                   title="Update composition"/>
                <i className="fa fa-trash m-2 clickable"
                   onClick={() => this.props.onDelete(composition)}
                   aria-hidden="true"
                   title="Delete composition"/>
            </div>
        )
    };

    constructor() {
        super();
        if (auth.getCurrentUser()) {
            this.columns.push(this.buttonColumn)
        }
    }

    render() {
        const {compositions, sortColumn, onSort} = this.props;

        return (
            <Table
                columns={this.columns}
                data={compositions}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }
}

export default CompositionsTable;