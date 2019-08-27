import React from 'react';
import DataTable from 'react-data-table-component';
import { Trans } from 'react-i18next';

class CustomTable extends React.Component {
    state = {
        selected: null
    }
    selectedRowElement = null;

    onRowClicked = (row, e) => {
        const { idName } = this.props;
        const { selected } = this.state;

        const newSelected = (selected === null || selected[idName] !== row[idName]) ? row : null;

        if (!!this.selectedRowElement)
            this.selectedRowElement.classList.remove("selected-custom-table-row");

        this.selectedRowElement = e.currentTarget;

        if (!!newSelected)
            this.selectedRowElement.classList.add("selected-custom-table-row");

        this.onSelectedChange(newSelected);
    }

    onSort = () => {
        if (!!this.state.selected) {
            if (!!this.selectedRowElement)
                this.selectedRowElement.classList.remove("selected-custom-table-row");

            this.onSelectedChange(null);
        }
    }

    onChangePage = (page) => {
        if (!!this.state.selected) {
            if (!!this.selectedRowElement)
                this.selectedRowElement.classList.remove("selected-custom-table-row");

            this.onSelectedChange(null);
        }
    }

    onSelectedChange = newSelected => {
        const { onRowClicked } = this.props;
        this.setState({ selected: newSelected });

        if (typeof onRowClicked === "function")
            onRowClicked(newSelected);
    }

    render() {
        const { titleOfTable, columns, data } = this.props;

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
                onRowClicked={this.onRowClicked}
                highlightOnHover={!!this.onRowClicked}
                pointerOnHover={!!this.onRowClicked}
                pagination
                customTheme={rowTheme}
                paginationComponentOptions={paginationOptions}
                onSort={this.onSort}
                onChangePage={this.onChangePage}
            />
        );
    }
}

export default CustomTable;