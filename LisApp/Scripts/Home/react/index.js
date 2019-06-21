import React from 'react';
import { render } from 'react-dom';
import Table from './table';
import Add from './add';

class App extends React.Component {
    render() {
        var data = [
            "wiersz 1",
            "wiersz 2",
            "wiersz 3",
            "wiersz 4"
        ];

        return (
            <>
                <h1>React in ASP.NET MVC!</h1>
                <div>Hello React World</div>
                <div>Hello HEJOOOOOOOOOOOOOOOOOOOOOOOOO World</div>
                <Table tableData={data} />
                <Add/>
            </>
            );
    }
}

render(<App />, document.getElementById('app'));