import React from 'react';
import ExpenseForm from './ExpenseForm';
import  { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {

    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        {/** 
            We use redirect, as we do not have a Link that we can simply click to send us to a new page
            So we use history.push (which we get as a prop for being a Router component - see AppRouter.js under the routers folder)
            This redirects us to any of the paths that are Router components

            NOTE: Using push also allow us to go back through the browsers back button as if it were actually a multi-page site
        */}
        this.props.history.push('/');           
    }

    render() {
        return (
            <div>  
                <h2>This is from my add Expense component</h2>
                <ExpenseForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

// Function gives us access to dispatch, and allows us to return an object that turns its properties into props properties
const mapDispatchToProps = (dispatch) => ({ startAddExpense: (expense) => dispatch(startAddExpense(expense)) });

export default connect(undefined, mapDispatchToProps)(AddExpensePage);