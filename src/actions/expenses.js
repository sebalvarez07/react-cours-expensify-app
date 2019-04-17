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

        // Push().then() comes back with a reference (red) to the ojbect that was just added (in this case the id)
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

// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});