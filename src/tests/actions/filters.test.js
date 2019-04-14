import { 
    setStartDate, 
    setEndDate, 
    setFilterText, 
    sortByDate, 
    sortByAmount  
} from '../../actions/filters';
import moment from 'moment';

test('Should generate setStartDate action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        date: moment(0)
    }); 
});

test('Should generate setEndDate action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        date: moment(0)
    })
});

test('Should generate setText action object from INPUT', () => {
    const action = setFilterText('Hello there!');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Hello there!'
    })
});

test('Should generate setText action object from DEFAULT values', () => {
    const action = setFilterText();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
});

test('Should generate sortByDate action object', () => {
    expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE'});
});

test('Should generate sortByAmount action object', () => {
    expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT'});
});

