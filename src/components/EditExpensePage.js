import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    
    onSubmit = (updates) => {
        this.props.editExpense(this.props.expense.id, updates);
        this.props.history.push('/');
    };

    handleRemoveExpense = () => {
        this.props.removeExpense({id: this.props.expense.id});
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.handleRemoveExpense}>Remove</button>
            </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        editExpense: (id, updates) => dispatch(editExpense(id, updates)),
        removeExpense: (id) => dispatch(removeExpense(id))
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