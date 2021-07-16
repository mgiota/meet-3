import React, { Component } from "react";

class Event extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }

        this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    toggleExpanded() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        return (
            <div>
                <h2 className="event-title">{this.props.title}</h2>
                <div className="basic-info">
                    <span>{this.props.startdate}</span>
                    <span>{this.props.location}</span>
                </div>
                <button
                    className="show-details"
                    onClick={this.toggleExpanded}
                >Show Details</button>
                <div
                    className={`row ${this.state.expanded ? 'expanded' : 'normal'}`}
                ></div>
            </div>
        )
    }
}

export default Event;