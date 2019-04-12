import React from 'react';
import ErrorMessage from './';
import { shallow } from 'enzyme';

test('it renders', () => {
    const component = shallow(
        <ErrorMessage message="Oh no!" />
    );

    expect(component.find('h1').text()).toBe('No job for this guy!');
    expect(component.find('p').text()).toBe('Oh no!');
});
