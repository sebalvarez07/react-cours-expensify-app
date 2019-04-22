import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, history, wrapper, startRemoveExpense;

beforeEach( () => {
    startRemoveExpense = jest.fn();
    startEditExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensePage 
        expense={expenses[0]} 
        startEditExpense={startEditExpense} 
        history={history} 
        startRemoveExpense={startRemoveExpense}/>);
});

test('Should render edit expense', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle edit expense on submit', () => {

    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

test('Should handle remove on button clicked', () => {
    wrapper.find('.remove-expense__btn').simulate('click');

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[0].id});
})