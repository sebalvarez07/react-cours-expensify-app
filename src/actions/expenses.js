import uuid from 'uuid';
import moment from 'moment';

// ADD_EXPENSE
export const addExpense = (
    { 
        // Set defaults
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = moment(0).valueOf() 
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

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