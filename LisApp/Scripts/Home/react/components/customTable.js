import React from 'react';
import DataTable from 'react-data-table-component';

class CustomTable extends React.Component {

    render() {
        const { titleOfTable, columns, data, rowClick } = this.props;
        return (
            <DataTable
                title={titleOfTable}
                columns={columns}
                data={data}
                onRowClicked={rowClick}
                highlightOnHover
                striped
                pagination
            />
        );
    }
}

export default CustomTable;