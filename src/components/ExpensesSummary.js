import React from 'react';
import { connect } from 'react-redux';
import expensesTotal from '../selectors/expenses-total';
import getVisibleExpenes from '../selectors/expenses';
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
    return {
        expenseCount: getVisibleExpenes(state.expenses, state.filters).length,
        expensesTotal: expensesTotal(getVisibleExpenes(state.expenses, state.filters))
    }
};

export default connect(mapStateToProps)(ExpensesSummary);
