import moment from 'moment';
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        // Setup defaults. If no description than empty string etc.
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = moment(0).valueOf() 
        } = expenseData;

        const expense = {description, note, amount,createdAt };

        // Push().then() comes back with a reference (ref) to the ojbect that was just added (in this case the id)
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    }
};  

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
        type: 'EDIT_EXPENSE',
        id, 
        updates
});

//START_EDIT_EXPENSE
export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        })
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// START_REMOVE_EXPENSE
export const startRemoveExpense = ({id} = {}) => {
    return dispatch => {
        return database.ref(`expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({id}));
        });
    };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
}); 

// START_REMOVE_EXPENSES
export const startSetExpenses = () => {
    return (dispatch) => {
        
        return database.ref('expenses').once('value').then((snapshot) => {
            let expenses = []
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });

            dispatch(setExpenses(expenses));
        });
    }
};