import Header from '../../components/Header';
import React from 'react';
import { shallow } from 'enzyme';

test('Should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});