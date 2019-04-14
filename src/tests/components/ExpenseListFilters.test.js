import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setStartDate, setEndDate, setFilterText, sortByDate, sortByAmount, wrapper;

beforeEach(() => {
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    setFilterText = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();

    wrapper = shallow(<ExpenseListFilters 
        setStartDate={setStartDate} 
        setEndDate={setEndDate}
        setFilterText={setFilterText}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        filters={filters}
    />);
});

test('Should render expense list filters', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should render expense list filters with alt data', () => {
    wrapper.setProps({filters: altFilters})
    expect(wrapper).toMatchSnapshot();
});

test('Should set filters text on input change', () => {

    const value = 'New Text';

    wrapper.find('input').simulate('change', {
        target: {
            value
        }
    });

    expect(setFilterText).toHaveBeenLastCalledWith(value);
});

test('Should sort filters by amount on change', () => {

    const value = 'amount';

    wrapper.find('select').simulate('change', {
        target: {
            value
        }
    });

    expect(sortByAmount).toHaveBeenCalled();
});

test('Should sort filters by date on change', () => {

    const value = 'date';

    wrapper.find('select').simulate('change', {
        target: {
            value
        }
    });

    expect(sortByDate).toHaveBeenCalled();
});

test('Should set filters start and end date onDateChange in RangePicker', () => {

    const startDate = moment(0).add('2', 'months');
    const endDate = moment(0).add('4', 'months');

    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('Should change the calendarFocus onFocusChange', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);

    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});