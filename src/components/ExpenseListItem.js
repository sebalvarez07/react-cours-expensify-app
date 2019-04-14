import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// We can destructure as we're passing the object expense's contents as a set of props (using spread operator)
const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <h3>
            <Link to={`/edit/${id}`} >Description: {description}</Link>
        </h3>
        
        <p>Amount: {numeral(amount / 100).format('$0,0.00')}</p>
        <p>Date created: {moment(createdAt).format('Do, MMMM, YYYY')}</p>
        <br></br> 
    </div>
);

export default ExpenseListItem;