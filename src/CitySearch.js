import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined,
        infoText: ''
    };

    handleInputChanged = (event) => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (suggestions.length === 0) {
            this.setState({ 
                query: value,
                suggestions,
                infoText: 'We can not find the city you are looking for. Please try another city',
            });
        } else {
            return this.setState({
                query: value,
                suggestions,
                infoText:''
            });
        }    
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false
        });

        this.props.updateEvents(suggestion, this.props.numberOfEvents);
    };

    render() {
        return (
            <div className="CitySearch">
                <InfoAlert text={this.state.infoText} />
                <input
                    type="test"
                    className="city"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />
                <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }}>
                    {this.state.suggestions.map((suggestion) => (
                        <li 
                            className="matchSuggestions"
                            key={suggestion}
                            onClick={() => this.handleItemClicked(suggestion)}
                        >{suggestion}</li>
                    ))}
                    <li 
                        className="seeAll"
                        key="all"
                        onClick={() => this.handleItemClicked("all")}
                    >
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;