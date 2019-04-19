import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// We can destructure as we're passing the object expense's contents as a set of props (using spread operator)
const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <Link className="list-item" to={`/edit/${id}`}>
        <div>
            <h3 className="list-item__title">{description}</h3>
            <span className="list-item__subtitle">{moment(createdAt).format('Do, MMMM, YYYY')}</span>
        </div>
        <h3 className="list-item__amount">{numeral(amount / 100).format('$0,0.00')}</h3>
    </Link>
);

export default ExpenseListItem;