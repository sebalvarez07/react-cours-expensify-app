import { createStore } from 'redux';

/*
    CreateStrore expects a function as first argument. That function sets up the state as default argument, 
    passing an object through it. In this case is count.
    --- https://redux.js.org/
*/

// Action generators --> functions that return action

// Using destructuring (ES6) to set a default if no object provided (see destructuring.js for explanation)
const incrementCount = ({ incrementBy = 1 } = {}) => ({
        // Syntax sensitive (type must be provided) but we can toss additional things
        type: 'INCREMENT',
        // Set increment to object passed OR default
        incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count }) =>({ 
    type: 'SET',
    count 
});

const resetCount = () =>({ 
    type: 'RESET'
});

// Reducers (compute new state based only on actions and the old state)
// 1. Reducers are pure functions (Meaning that the only things that are used inside the function are parameters)
// 2. Never change estate or action. We only read from them
// 3.   

const countReducer = ((state = { count: 0 }, action) => {
    
    switch(action.type){
        case 'INCREMENT':
            return  {
                // We do not change the original state
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            
            return  {
                // We do not change the original state
                count: state.count - action.decrementBy
            };
        case 'RESET':
            return  {
                // We do not change the original state
                count: 0
            };
        case 'SET':
            return  {
                // We do not change the original state
                count: action.count
            };
        default:
        return state;
    }
    
});

const store = createStore(countReducer);

// Watch for changes to store. So when store changes, do something
// store.subscribe(() => {
//     console.log(store.getState());    
// });

// To stop watching --> store.subscribe returns a function (closure) which calls unsubscribe
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());    
});


/*  Actions - store.dispatch() sends an object to the store
*/ 

//Dispatch sends the object and runs the createStore again
store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(resetCount());

// Stop watching store for changes
// unsubscribe();

store.dispatch(incrementCount());

store.dispatch(decrementCount({decrementBy: 100}));
store.dispatch(decrementCount());

store.dispatch( setCount({ count: 101 }) );