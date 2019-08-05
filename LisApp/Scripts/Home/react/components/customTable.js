import React from 'react';
import DataTable from 'react-data-table-component';
import { Trans } from 'react-i18next';

class CustomTable extends React.Component {

    render() {
        const { titleOfTable, columns, data, onRowClicked } = this.props;

        const rowTheme = {
            rows: {
                spacing: 'spaced',
                spacingBorderRadius: '20px',
                spacingMargin: '3px',

                borderColor: 'rgba(0,0,0,.12)',
                backgroundColor: 'white',
                height: '52px'
            },
            cells: {
                cellPadding: '48px'
            }
        };

        const paginationOptions = {
            rowsPerPageText: <Trans>RowsPerPage</Trans>, rangeSeparatorText: ":"
        };

        return (
            <DataTable
                title={titleOfTable}
                columns={columns}
                data={data}
                onRowClicked={onRowClicked}
                highlightOnHover
                pagination
                customTheme={rowTheme}
                pointerOnHover
                paginationComponentOptions={paginationOptions}
            />
        );
    }
}

export default CustomTable;