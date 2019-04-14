import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import moment from 'moment';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'; 

const store = configureStore();

store.dispatch(addExpense({ description: 'Water Bill', amount: 32 }));
store.dispatch(addExpense({ description: 'Gas Bill', amount: 3000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 1095, createdAt: moment().valueOf() }));

/*
    Provider lets us define a store that we want to provide to all of our components inside AppRouter
*/
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
