import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ReactModal from 'react-modal';
 
ReactModal.setAppElement(document.getElementById('app'));

export class EditExpensePage extends React.Component {

    state = {
        showModal: false
    }
    
    onSubmit = (updates) => {
        this.props.startEditExpense(this.props.expense.id, updates);
        this.props.history.push('/');
    };

    handleRemoveExpense = () => {
        this.props.startRemoveExpense({id: this.props.expense.id});
        this.setState({ showModal: false });
        this.props.history.push('/');
    };

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
      
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }
      

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h2 className="page-header__title">
                            Edit Expense
                        </h2>
                    </div> 
                </div>

                <div className="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button className="btn btn--grey" onClick={this.handleOpenModal}>
                        Remove Expense
                    </button>
                </div>

                <ReactModal 
                    className='modal modal--remove-expense'
                    overlayClassName='modal-overlay'
                    isOpen={this.state.showModal}>
                    <h3 className="modal__title">Delete Expense</h3>
                    <p className="modal__text">Are you sure you want to delete this expense?</p>
                    <div className="modal__footer">
                        <button className="btn btn--grey" onClick={this.handleCloseModal}>
                            Close
                        </button>

                        <button className="btn btn--blue remove-expense__btn" onClick={this.handleRemoveExpense}>
                            Remove expense
                        </button>
                    </div>
                </ReactModal>
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