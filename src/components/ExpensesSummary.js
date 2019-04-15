import React from 'react';
import { connect } from 'react-redux';
import expensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';

export const ExpensesSummary = ({expenseCount, expensesTotal}) => {

    const word = expenseCount === 1 ? 'expense' : 'expenses';
    const numFormat = numeral(expensesTotal / 100).format('$0,0.00');
    return (
        <div>
            <h2>Expenses summary: Viewing {expenseCount} {word} totaling {numFormat}</h2>
        </div>
    )
};

const mapStateToProps = (state) => { 
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: expensesTotal(visibleExpenses)
    }
};

export default connect(mapStateToProps)(ExpensesSummary);
