import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('Should setup default filter values', () => {
    // @@INIT is the action that initializes the reducer with its default values
    const state = filtersReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});

    expect(state.sortBy).toBe('amount');
});

test('Should set sortBy to date', () => {

    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }

    const state = filtersReducer(currentState, { type: 'SORT_BY_DATE' });

    expect(state.sortBy).toBe('date');
});

test('Should set the text filter', () => {
    const action = {
        type: 'SET_TEXT_FILTER',
        text: 'Hello dear world' 
    }

    const state = filtersReducer(undefined, action);

    expect(state.text).toBe('Hello dear world');
});

test('Should set the startDate', () => {
    const date = moment();
    const action = {
        type: 'SET_START_DATE',
        date
    }

    const state = filtersReducer(undefined, action);

    expect(state.startDate).toBe(date);
});

test('Should set the endDate', () => {
    const date = moment();
    const action = {
        type: 'SET_END_DATE',
        date
    }

    const state = filtersReducer(undefined, action);

    expect(state.endDate).toBe(date);
});