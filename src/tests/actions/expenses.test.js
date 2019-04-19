import { addExpense, editExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses, startEditExpense, startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import moment from 'moment';

const createMockStore = configureStore([thunk]);

const uid =  'abc123';
const defaultAuthState = {auth: { uid }}

// Setup dummy data and write it to the database
beforeEach((done) => {

    const expensesData = {};

    // Here we populate the expensesData object with the array contents. Making each array element an expense object 
    expenses.forEach(({id, description, note, amount, createdAt }) => {
        // ExpensesData[id] produces the same result as expensesData.id
        // If it doesn't exist it will create the property and then populate it
        expensesData[id] = { description, note, amount, createdAt }
    });

    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
    
});

test('Should setup remove expense action object', () => {
    const id = '123abc';
    const action = removeExpense({id});

    // We use toEqual to compare objects
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id
    });
});

test('Should remove expense from database and dispatch action to store', (done) => {

    // We can pass any default states to the mock store
    const store = createMockStore(defaultAuthState);

    const id = expenses[0].id;

    store.dispatch(startRemoveExpense({id}))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id
            });

            return database.ref(`users/${uid}/expenses/${id}`).once('value');
        })
        .then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
        });
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

test('Should set edit expense in databse and dispatch action to store', (done) => {
    const store = createMockStore(defaultAuthState);

    const id = expenses[0].id

    const updates = {
        amount: 39500
    };

    const expense = {
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
    };

    store.dispatch(startEditExpense(id, updates))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id: expenses[0].id,
                updates
            });

            return database.ref(`users/${uid}/expenses/${id}`).once('value');
        })
        .then((snapshot) => {
            const expenseVal = snapshot.val();
            expect(expenseVal.amount).toBe(updates.amount);
            done();
        });
})

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

    const store = createMockStore(defaultAuthState);
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
            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        })
        .then((snapshot) => {
            const val = snapshot.val();
            expect(val).toEqual(expense);
            // The done function must be placed inside and at the end the latest async function that fires
            done();
        });
});



test('Should add expense to database and store with DEFAULT values', (done) => {

    const store = createMockStore(defaultAuthState);
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
            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        })
        .then((snapshot) => {
            const val = snapshot.val();
            expect(val).toEqual(expenseDafaults);
            // The done function must be placed inside and at the end the latest async function that fires
            done();
        });
});


test('Should set action object for setExpenses action', () => {

    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});

test('Should dispatch setExpenses action using database expenses', (done)=>{

    const store = createMockStore(defaultAuthState);
    
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});