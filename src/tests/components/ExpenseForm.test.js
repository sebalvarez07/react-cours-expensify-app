import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('Should render expense using default values', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm using data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

    // Since e.preventDefault yeilds a type error saying that e is not defined
    // In other words there is no preventDefault function for e, since nothing is being passed for e.
    // So we create an object containing the method preventDefault and pass it as argument
    // Leadeing to (e) as a parameter to yeitld e.preventDefault() with no return value;
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    // We test if there is an error
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    //Then we write snapshot
    expect(wrapper).toMatchSnapshot();
});

test('Should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = 'New description'
    wrapper.find('input').at(0).simulate('change', {
        target: {
            value
        }
    });

    expect(wrapper.state('description')).toBe(value);
});

test('Should set note on textarea change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = 'New note'
    wrapper.find('textarea').simulate('change', {
        target: {
            value
        }
    });

    expect(wrapper.state('note')).toBe(value);
});

test('Should set amount on input change with appropriate value', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = '10.02';
    wrapper.find('input').at(1).simulate('change', {
        target: {
            value
        }
    });

    expect(wrapper.state('amount')).toBe(value);
});


test('Should set amount on input change with incorrect value', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = '10.022';
    wrapper.find('input').at(1).simulate('change', {
        target: {
            value
        }
    });

    expect(wrapper.state('amount')).toBe('');
});

test('Should call onsubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();

    // Spies can take arguments that later we can test for
    const wrapper = shallow(<ExpenseForm onSubmit={onSubmitSpy} expense={expenses[0]}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    // Error should get cleared when there's valid data
    expect(wrapper.state('error')).toBe('');

    // Check spy's arguments passed through onSubmit prop
    expect(onSubmitSpy).toHaveBeenCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt,
    });
});

test('Should set new date on dateChange', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);

    expect(wrapper.state('createdAt')).toEqual(now);
});

test('Should set calendarFocused on focusChange', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});

    expect(wrapper.state('calendarFocused')).toBe(focused);
});