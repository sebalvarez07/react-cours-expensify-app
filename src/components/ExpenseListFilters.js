import React from 'react';
import { connect } from 'react-redux';
import { setFilterText, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends React.Component {

    state = {
        calendarFocused: null
    };

    handleOnDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocuseChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }))
    };

    onChangeTextFilter = (e) => {
        const val = e.target.value;
        this.props.setFilterText(val);
    };

    onChangeSortbyFilter = (e) => {
        const val = e.target.value;

        if(val === 'date') {
            this.props.sortByDate();
        } 
        else if(val === 'amount') {
            this.props.sortByAmount();
        }
    };

    render(){
        return (
            <div>
                <input 
                    type="text"  
                    value={this.props.filters.text} 
                    onChange={this.onChangeTextFilter}
                />
                <select 
                    value={this.props.filters.sortBy} 
                    onChange={this.onChangeSortbyFilter}>
                    
                    <option value="amount">Amount</option>
                    <option value="date">Date</option>
                </select>
        
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate} 
                    onDatesChange={this.handleOnDatesChange}
                    focusedInput={this.state.calendarFocused} 
                    onFocusChange={this.onFocuseChange}
                    isOutsideRange={() => false}
                    numberOfMonths={1}
                    showClearDates={true}
                />
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate)),
        setFilterText: (text) => dispatch(setFilterText(text)),
        sortByDate: () => dispatch(sortByDate()),
        sortByAmount: () => dispatch(sortByAmount()),
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

const ExpenseListFiltersWrapped = connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);

export default ExpenseListFiltersWrapped;