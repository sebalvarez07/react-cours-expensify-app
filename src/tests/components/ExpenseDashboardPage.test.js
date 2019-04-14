import React from 'react';
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';
import { shallow } from 'enzyme';

test('Should render Expense dashboard page page', () => {
    const wrapper = shallow(<ExpenseDashboardPage />);
    expect(wrapper).toMatchSnapshot();
});