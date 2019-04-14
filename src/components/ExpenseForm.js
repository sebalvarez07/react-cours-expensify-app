import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount / 100).toString(): '',
            note: props.expense ? props.expense.note : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: undefined
        };
    }

    onDescriptionChange = (e) => {

        /* 
            We do this as a two step process because setState is an async function meaning that the object contents do not get executed right away
            This is a problem in this case as the value of e.target does not 'persist', and must be used right away.
            There is another way to go about this if we want to use description: e.target.value inside the setState
            By putting this line before everything :
            e.persist()
        */
       
        const description = e.target.value;
        this.setState(() => ({ description }));
    }

    onAmountChange = (e) => {
        const amount = e.target.value;

        // The $ sign at the end is crucial as it marks the end of the input. Anything written after the 
        // 2 decimal places will not match and so it will not be written on the state, which means it will
        // Not be printed as a value to the input
        // Thus the input is registered onChange, but not displayed, the process of dealing with the input
        // Handled and the when the state is updated, the value={this.state.amount} will be printed

        /*
            ^   - marks the begining of input
            \d  - Means digits = [0 - 9]
            *   - Means match the preceeding expression 0 or more times = {0,}
            ()? - Means match preceeding expression 0 or 1 time (maybe it happens, maybe not) = {0, 1}
            \.  - Means literally a dot(.)
            $   - Marks the end of input. IF this isn't the end, returns false

            !amount --> If there is no amount OR if there is a match
        */

        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({ amount }));
        }
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }

    onDateChange = (createdAt) => {
        
        if(createdAt){
            this.setState(() => ({ createdAt: createdAt }));
        }
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount){
            this.setState(() => ({error: 'Please provide a description and amount'}));
        } else {
            this.setState(() => ({error: '' }));
            this.props.onSubmit({
                description: this.state.description, 
                amount: parseFloat(this.state.amount, 10) * 100,    // We eliminate the . of decimals while keeping the decimes in the ciphre
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf()
            });
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                {this.state.error && <h3>{this.state.error}</h3>}

                <label>Description</label>
                <input 
                    type="text" 
                    name="description" 
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
        
                <label>Amount</label>
                <input 
                    type="text" 
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
        
                <label>Note</label>
                <textarea 
                    name="note"
                    placeholder="Add a note for your expense (optional)"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                />

                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange} 
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
        
                <button>Add Expense</button>
            </form>
        )
    }
}

export default ExpenseForm;