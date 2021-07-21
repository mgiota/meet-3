import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({
            numberOfEvents: value
        });
        this.props.updateNumber(event.target.value);
    };

    render() {
        const numberOfEvents = this.state.numberOfEvents;
        return (
            <div className="NumberOfEvents">
                <form>
                    <label>Number of Events:</label>
                    <input
                        type="text"
                        className="EventsNumber"
                        value={numberOfEvents}
                        onChange={(e) => this.handleInputChanged(e)}
                    />
                </form>
            </div>
        );
    }
}

export default NumberOfEvents;