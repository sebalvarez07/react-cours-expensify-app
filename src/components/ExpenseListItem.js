import React from 'react';
import { Link } from 'react-router-dom'

// We can destructure as we're passing the object expense's contents as a set of props (using spread operator)
const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <h3>
            <Link to={`/edit/${id}`} >Description: {description}</Link>
        </h3>
        
        <p>Amount: {amount}</p>
        <p>createdAt {createdAt}</p>
        <br></br> 
    </div>
);

export default ExpenseListItem;