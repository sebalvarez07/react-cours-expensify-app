import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
 
export class EditExpensePage extends React.Component {
    
    onSubmit = (updates) => {
        this.props.startEditExpense(this.props.expense.id, updates);
        this.props.history.push('/');
    };

    handleRemoveExpense = () => {
        this.props.startRemoveExpense({id: this.props.expense.id});
        this.props.history.push('/');
    };

    render() {
        return (
            <div>

                <div class="page-header">
                    <div class="content-container">
                        <h2 class="page-header__title">
                            Edit Expense
                        </h2>
                    </div> 
                </div>

                <div class="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button className="btn btn--grey" onClick={this.handleRemoveExpense}>
                        Remove Expense
                    </button>
                </div>
            </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditExpense: (id, updates) => dispatch(startEditExpense(id, updates)),
        startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
    }
}

/*
    state gives the store's state
    props gives us the connected (or wrapped) props
*/
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find(el => el.id === props.match.params.id)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);