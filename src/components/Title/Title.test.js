import React from 'react';
import Title from './';
import { shallow } from 'enzyme';

test('it renders', () => {
    const component = shallow(
        <Title>My title</Title>
    );

    expect(component.find('h1').text()).toBe('My title');
});
