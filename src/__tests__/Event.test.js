import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[1]} />);
    });

    test('summary shown', () => {
        expect(EventWrapper.find('.EventSummary')).toHaveLength(1);
    });

    test('event location shown', () => {
        expect(EventWrapper.find('.EventLocation')).toHaveLength(1);
    });

    test('event date shown', () => {
        expect(EventWrapper.find('.EventDate')).toHaveLength(1);
    });

    test('render expand event details on click', () => {
        EventWrapper.setState({ show: false })
        EventWrapper.find('.showMore').simulate('click');
        expect(EventWrapper.state('show')).toBe(true);
    });
})