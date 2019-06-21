import React, { Component } from 'react';

class Table extends Component {
    render() {
        const { tableData } = this.props;
        return (
            <div>
                {tableData.map(x =>
                   (<div key={x}>
                        {x}
                    </div>))}
            </div>
        );
    }
}

export default Table;