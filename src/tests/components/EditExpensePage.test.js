import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, history, wrapper, removeExpense;

beforeEach( () => {
    removeExpense = jest.fn();
    editExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensePage 
        expense={expenses[0]} 
        editExpense={editExpense} 
        history={history} 
        removeExpense={removeExpense}/>);
})

test('Should render edit expense', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle edit expense on submit', () => {

    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

test('Should handle remove on button clicked', () => {
    wrapper.find('button').simulate('click');

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[0].id});
})