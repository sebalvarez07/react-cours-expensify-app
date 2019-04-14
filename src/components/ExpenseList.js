import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenes from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map(
                    (expense, index) => <ExpenseListItem key={`${expense.id}`} {...expense}/>
                )
            )
        }
    </div> 
);

/*
    - This is called everytime the store changes
    - Returns an object with the data that this component needs and sends it to the component as props
    - Returns an object with expenses and dispatch fn
*/
const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenes(state.expenses, state.filters)
    };
};
/*
    - connect() returns a new function that takes the component to be wrapped as an argument
    - We don't have to be concerned with store.subscribe() or dispatching. All taken care of by react-redux
*/
export default connect(mapStateToProps)(ExpenseList);