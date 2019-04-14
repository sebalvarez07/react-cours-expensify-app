import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import EditExpensePage from '../components/EditExpensePage';
import AddExpensePage from '../components/AddExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
    //BroswerRouter needs to have a child length of 1. So we have to put all routes inside the same element
    <BrowserRouter>
        <div>
            {/* Header does not get the props that Route components get, 
                because it is not a route component --> <Route path component={Route component} 
            */}
            <Header />

            {/* Switch becomes a switch statement that checks router definitions and renders first match */}
            <Switch>
                {/* Adding exact tells Route to only render exact paths. '/' and '/create' 
                    start with the same '/' so as soon as that condition is met it will render.
                    In this case rendering both dashboard and add expense pages.
                */}
                {/**
                    Every component passed as a Route component has a access to a variety of props such as history, 
                    which allow functionalities, such as re-directs to happen
                */}
                <Route path="/" component={ExpenseDashboardPage} exact={true}/>
                <Route path="/create" component={AddExpensePage} />
                {/* 
                    By Adding /:id we can make the url dynamic, we can now access
                    the url through the params object inside the match object (props that are passed 
                    to every route component)
                */}
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
        
    </BrowserRouter>

);

export default AppRouter;