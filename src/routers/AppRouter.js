import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import EditExpensePage from '../components/EditExpensePage';
import AddExpensePage from '../components/AddExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage  from '../components/LoginPage';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
    //BroswerRouter needs to have a child length of 1. So we have to put all routes inside the same element
    <Router history={history}>
        <Switch>
            {/* Adding exact tells Route to only render exact paths. '/' and '/create' 
                start with the same '/' so as soon as that condition is met it will render.
                In this case rendering both dashboard and add expense pages.
            */}
            {/**
                Every component passed as a Route component has a access to a variety of props such as history, 
                which allow functionalities, such as re-directs to happen
            */}
            <Route path="/" exact={true} component={LoginPage} />
            <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
            <PrivateRoute path="/create" component={AddExpensePage} />
            {/* 
                By Adding /:id we can make the url dynamic, we can now access
                the url through the params object inside the match object (props that are passed 
                to every route component)
            */}
            <PrivateRoute path="/edit/:id" component={EditExpensePage} />
            <Route component={NotFoundPage} />
        </Switch>
    </Router>

);

export default AppRouter;