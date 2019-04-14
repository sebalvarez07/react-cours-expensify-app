// Expenses Reducer

const expensesReduceDefault = [];

// The state is simply an array --> the expense object is created inside the combineReducers() call
const expensesReducer = (state = expensesReduceDefault, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            // On the filter parameters we are destructuring currentElement.id, by doing { id } = 
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                // console.log(action.expense.id);
                    if(expense.id === action.id) {
                        return {
                            ...expense,
                            ...action.updates
                        }
                    } else {
                        return expense;
                    }
                })
            
        default: 
            return state
    }
}

export default expensesReducer;