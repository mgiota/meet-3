import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';

describe('<Event /> component', () => {
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event />);
    });

    test('render event title', () => {
        expect(EventWrapper.find('.event-title')).toHaveLength(1);
    });

    test('render basic event information', () => {
        expect(EventWrapper.find('.basic-info')).toHaveLength(1);
    });

    test('render show details button', () => {
        expect(EventWrapper.find('.show-details')).toHaveLength(1);
    });

    test('render expand event details on click', () => {
        EventWrapper.setState({ expanded: false })
        EventWrapper.find('.show-details').simulate('click');
        expect(EventWrapper.state('expanded')).toBe(true);
    });
})