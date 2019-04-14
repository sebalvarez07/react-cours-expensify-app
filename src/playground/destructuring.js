// const person = {
//     name: 'Seb',
//     // age: 29,
//     location: {
//         city: 'Montreal',
//         temp: 88
//     }
// }

// // Simple destructuring
// // const {name, age} = person;

// // Default values, default value and change property name in one line
// const {name = 'Anonymous', age: years = 29} = person;

// console.log(`${name} is ${years}`);

// // Changing the name of property to access it outside object
// const {city, temp: temperature} = person.location;

// if(city && temperature){
//     console.log(`Its ${temperature} in ${city}`);
// }


// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Pinguin'
//     }
// }

// const {name: publisherName = 'Self-Published'} = book.publisher;
// console.log(publisherName);

// const address = ['1299 S Juniper Street', 'Montreal', 'Quebec', 'H3H1C3'];

// Destructuring in arrays works by matching position as apposed to name
// const [, city, province = 'no-province'] = address

// console.log(`You are in ${city} ${province}.`);

// const item = ['Coffee (iced)', '$3.00', '$3.50', '$3.75'];

// const [itemSold, , medium] = item

// console.log(`A ${itemSold} costs ${medium}`);


/*  Destructuring using default parameters
    
        add = ({a = 1, b = 2}) => a + b;

    The code above only works if an object is actually passed when the function is called, even if the object
    is empty, because then the values of a and b are undefined:

        add({});

    BUT if we pass no object at all, then a typeError will be produced. 
    
        add();

    Would be the same as saying:

        const {a = 2} = null;

    This above fails as there is NO object at all to read from. 

    If what we want is to set default parameters using destructuring, the following code will work much better

        add = ({a = 20, b = 10} = {}) => a + b;
    
    The code above works because we're saying, if no object at all is passed, then the default value is
    an empty object. And as we can see above, with an empty object we can assign default values
*/

const add = ({a = 1, b = 2} = {}) => {
    return a + b;
}
// Null coerced to a number is 0, undefined is NaN so the default kicks in
console.log('add is: ' + add({ a: null, b: undefined }));