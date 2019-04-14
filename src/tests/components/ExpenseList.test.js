import React from 'react';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses.js';
import { shallow } from 'enzyme';

test('Should render ExpenseList with expenses', () => {

    const expenseList = shallow(<ExpenseList expenses={expenses}/>);
    expect(expenseList).toMatchSnapshot();
});

test('Should render ExpenseList without expenses', () => {

    const expenseList = shallow(<ExpenseList expenses={[]}/>);
    expect(expenseList).toMatchSnapshot();
});

