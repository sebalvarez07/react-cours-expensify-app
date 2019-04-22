import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('Should render summary with 2 expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={3} expensesTotal={200} allExpenses={0}/>);
    expect(wrapper).toMatchSnapshot();
});

test('Should render summary with 1 expense and 0 hidden expenses ', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={100} allExpenses={0}/>);
    expect(wrapper).toMatchSnapshot();
});

test('Should render summary with 1 expense and 5 hidden expenses ', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={100} allExpenses={5}/>);
    expect(wrapper).toMatchSnapshot();
});