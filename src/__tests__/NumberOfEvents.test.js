import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.eventNumber')).toHaveLength(1);
    });

    test('renders text input correctly', () => {
        const number = NumberOfEventsWrapper.state('number');
        expect(NumberOfEventsWrapper.find('.eventNumber').prop('value')).toBe(number);
    });

    test('change state when input changes', () => {
        NumberOfEventsWrapper.setState({
            number: 37
        });
        const eventObject = { target: { value: 5 } };
        NumberOfEventsWrapper.find('.eventNumber').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('number')).toBe(5);
    });
})