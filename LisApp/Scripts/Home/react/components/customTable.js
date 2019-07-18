import React from 'react';
import DataTable from 'react-data-table-component';

class CustomTable extends React.Component {

    render() {
        const { titleOfTable, columns, data, onRowClicked } = this.props;
        return (
            <DataTable
                title={titleOfTable}
                columns={columns}
                data={data}
                onRowClicked={onRowClicked}
                highlightOnHover
                striped
                pagination
            />
        );
    }
}

export default CustomTable;