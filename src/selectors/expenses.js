// Get visible expenses
import moment from 'moment';

const getVisibleExpenes = (expenses, {text, sortBy, startDate, endDate}) => {

    const temp =  expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        // Statement --> if startDate undefined OR expense was created a date later than filter start date
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true ;
        // If text filter is empty it will come back as true anyway '' is not the same as ' '
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    });

    temp.sort( (a, b) => {
        if(sortBy === 'date'){  
            // return a.createdAt - b.createdAt
            return a.createdAt < b.createdAt? 1 : -1;
        }

        else if(sortBy === 'amount'){
            // return a.amount - b.amount
            return a.amount < b.amount ? 1 : -1;
        }
    });

    return temp;
}

export default getVisibleExpenes;