import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import moment from 'moment';

const createMockStore = configureStore([thunk]);

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

    const action = addExpense(expenses[0]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenses[0]
        }
    });
});

// This action actually dispatches another action, so what we're really testing here is 
// What exactly was dispatched
// At this point, the test will pass no matter what, but the dispatch call doesn't get executed on time.
// Since we're using asnychronous code in here we need to provide Jest with some idea of when to return
// So we use (done) --> which tells Jest that this test will not be considered success or failure untill after we call done()
test('Should add expense to database and store with PROVIDED values', (done) => {

    const store = createMockStore({});
    const expense = {
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt,
    }

    store.dispatch(startAddExpense(expense))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual(addExpense({
                ...expense,
                id: expect.any(String)
            }));

            // Since database returns a promise. Same as return new promise((resolve, reject) => {})
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        })
        .then((snapshot) => {
            const val = snapshot.val();
            expect(val).toEqual(expense);
            // The done function must be placed inside and at the end the latest async function that fires
            done();
        });
});



test('Should add expense to database and store with DEFAULT values', (done) => {

    const store = createMockStore({});
    const expenseDafaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: moment(0).valueOf()
    }

    store.dispatch(startAddExpense())
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual(addExpense({
                ...expenseDafaults,
                id: expect.any(String)
            }));

            // Since database returns a promise. Same as return new promise((resolve, reject) => {})
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        })
        .then((snapshot) => {
            const val = snapshot.val();
            expect(val).toEqual(expenseDafaults);
            // The done function must be placed inside and at the end the latest async function that fires
            done();
        });
});