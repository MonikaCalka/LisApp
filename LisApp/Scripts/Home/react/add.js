import React, { Component } from 'react';

class Add extends Component {
    state = {
        a: 0,
        b: 0,
        sum: 0
    };
    onChange = e => {
        const value = parseInt(e.target.value);
        const name = e.target.name;

        //this.state[name] == this.state.a;
        const sum = name === "a" ? this.state.b + value : this.state.a + value;
        this.setState({
            [name]: value,
            sum: sum
        });
    }
    render() {
        return (
            <div>
                <input type="text" name="a" onChange={this.onChange} />
                +
                <input type="text" name="b" onChange={this.onChange} />
                = {this.state.sum}
            </div>
        );
    }
}

export default Add;