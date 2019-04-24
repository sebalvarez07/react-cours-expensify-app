import React from 'react';
import { connect } from 'react-redux';
import expensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

export const ExpensesSummary = ({expenseCount, expensesTotal, allExpenses}) => {

    const word = expenseCount === 1 ? 'expense' : 'expenses';
    const numFormat = numeral(expensesTotal / 100).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                <h2 className="page-header__title">
                    Viewing <span>{expenseCount}</span> {word} totaling <span>{numFormat}</span>
                </h2>
                <div className="page-header__actions">
                    <Link className="btn btn--blue" to="/create"> Add Expense </Link>
                </div>
                { allExpenses.length - expenseCount > 0 && 
                    <p>Not showing {allExpenses.length - expenseCount} expenses due to filters being applied</p>
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state) => { 
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: expensesTotal(visibleExpenses),
        allExpenses: state.expenses
    }
};

export default connect(mapStateToProps)(ExpensesSummary);
