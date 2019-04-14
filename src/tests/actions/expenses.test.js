import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
import moment from 'moment';

test('Should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });

    // We use toEqual to compare objects
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('Should setup edit expense action object', () => {
    const action = editExpense('123abc', { description: 'Hello', createdAt: 123456});

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            description: 'Hello',
            createdAt: 123456
        }
    })
});

test('Should setup add expense action object with PROVIDED values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent'
    };

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});

test('Should setup add expense action object with DEFAULT values', () => {
    const expenseData = {
        description: '',
        amount: 0,
        createdAt: moment(0).valueOf(),
        note: ''
    }

    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});