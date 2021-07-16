import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        number: 37
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({
            number: value
        });
    };

    render() {
        return (
            <div className="NumberOfEvents">
                <input
                    type="number"
                    className="eventNumber"
                    value={this.state.number}
                    onChange={this.handleInputChanged}
                />
            </div>
        );
    }
}

export default NumberOfEvents;