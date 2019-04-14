// import { createStore, combineReducers } from 'redux';

// store.subscribe(() => {
//     const state = store.getState();
//     const visibleExpenses = getVisibleExpenes(state.expenses, state.filters)
//     console.log(visibleExpenses);
//     // console.log(store.getState());
// });

// // expenseItemOne stores the action object
// const expenseOne = store.dispatch(addExpense( { description: 'rent', amount: 2000, createdAt: 3000} ));
// const expenseTwo = store.dispatch(addExpense( { description: 'rent two', amount: 4000, createdAt: 5000} ));
// store.dispatch(addExpense( { description: 'rento', amount: 1000, createdAt: 1000} ));
// store.dispatch(addExpense( { description: 'rento', amount: 1000, createdAt: 10000} ));
// store.dispatch(addExpense( { description: 'rento', amount: 3000, createdAt: 8000} ));
// store.dispatch(addExpense( { description: 'rento', amount: 8000, createdAt: 0} ));

// // store.dispatch(removeExpense({ id: expenseTwo.expense.id }));

// // store.dispatch(editExpense( expenseTwo.expense.id, { description: 'Enough paying rent!!!' } ));

// store.dispatch(setFilterText('rent'));

// store.dispatch(sortByAmount());
// // store.dispatch(sortByDate());

// // store.dispatch(setStartDate(0));
// // store.dispatch(setEndDate(1250));







const demoState = {
    expoenses: [{
        id: '',
        description: '',
        note: '',
        amount: '',
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',       // date or amount
        startDate: undefined,
        endDate: undefined
    }
};


// const user = {
//     name: 'Jo',
//     age: 23
// }

// const location = 'Montreal';

// console.log({
//     ...user,
//     age: 12,
//     location,
// })