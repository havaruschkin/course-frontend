import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({columns, sortColumn, onSort, data}) => {
    return (
        <table style={{width: "100%"}}>
            <TableHeader
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />
            <TableBody
                data={data}
                columns={columns}
            />
        </table>
    );
};

export default Table;