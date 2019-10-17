import React from 'react';
import DataTable from 'react-data-table-component';
import { Trans } from 'react-i18next';
import { withAlert } from 'react-alert';

class CustomTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            searchValue: ""
        };
    }

    selectedRowElement = null;

    onChangeSearchValue = (event) => {
        this.setState({ searchValue: event.target.value });
        if (!!this.state.selected) {
            if (!!this.selectedRowElement)
                this.selectedRowElement.classList.remove("selected-custom-table-row");

            this.onSelectedChange(null);
        }
    }

    checkSearchValue = (value) => {
        if (this.state.searchValue === "") {
            return value;
        }
        let values = this.state.searchValue.split(";");
        let i, j;
        for (i = 0; i < values.length; i++) {
            for (j = 0; j < this.props.searchableColumn.length; j++) {
                if (typeof value[this.props.searchableColumn.find(x => x.id === j).name] === "string") {
                    if (value[this.props.searchableColumn.find(x => x.id === j).name].toUpperCase().indexOf(values[i].trim().toUpperCase()) > -1) {
                        return value;
                    }
                }
            }
        }
    }

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

    showInfo = () => {
        this.props.alert.info(<Trans>SearchInfo</Trans>);
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

        let filteredData = this.props.data.filter(this.checkSearchValue);

        const noDataString = <Trans>NoDataTable</Trans>;

        return (
            <div className="data-table">
                <DataTable
                    title={titleOfTable}
                    columns={columns}
                    data={filteredData}
                    onRowClicked={this.onRowClicked}
                    highlightOnHover={!!this.onRowClicked}
                    pointerOnHover={!!this.onRowClicked}
                    pagination
                    customTheme={rowTheme}
                    paginationComponentOptions={paginationOptions}
                    onSort={this.onSort}
                    onChangePage={this.onChangePage}
                    subHeader
                    noDataComponent={noDataString}
                    subHeaderComponent={<div>
                        <button className="search-button" type="button" onClick={this.showInfo}></button>
                        <input className="form-control custom-form search-input" type="text" value={this.state.searchValue} onChange={this.onChangeSearchValue} name="Search" />
                    </div>}
                />
            </div>
        );
    }
}

export default withAlert()(CustomTable);