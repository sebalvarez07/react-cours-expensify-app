import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should set the default expenses state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});

    expect(state).toEqual([]);
});

test('Should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            description: 'Inflatable pool',
            amount: 999,
            note: '',
            createdAt: 0
        }
    }

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([...expenses, {
        description: 'Inflatable pool',
        amount: 999,
        note: '',
        createdAt: 0
    }]);
});

test('Should remove an expense using the correct ID', () => {

    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id
    }

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[1], expenses[2]]);
});

test('Should remove an expense using an incorrect ID', () => {

    const action = {
        type: 'REMOVE_EXPENSE',
        id: 10
    }

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('Should edit an expense', () => {

    const amount = 300000;

    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            amount
        }
    }

    const state = expensesReducer(expenses, action);

    expect(state[0].amount).toBe(amount);
});

test('Should not edit an expense if ID not found', () => {

    const amount = 300000;

    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            amount
        }
    }

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});