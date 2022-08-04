import useInput from '../../hooks/use-input';

import classes from './Checkout.module.css';

const notBlank = (str) => str.trim() !== '';
const lengthFive = (str) => str.trim().length === 5;

const Checkout = (props) => {
    const [enteredName, nameValid, nameInvalid, nameChangeHandler, nameBlurHandler, resetName, nameClass] = useInput(notBlank, 'invalid');
    const [enteredStreet, streetValid, streetInvalid, streetChangeHandler, streetBlurHandler, resetStreet, streetClass] = useInput(notBlank, 'invalid');
    const [enteredPostal, postalValid, postalInvalid, postalChangeHandler, postalBlurHandler, resetPostal, postalClass] = useInput(lengthFive,'invalid');
    const [enteredCity, cityValid, cityInvalid, cityChangeHandler, cityBlurHandler, resetCity, cityClass] = useInput(notBlank, 'invalid');

    const formValid = nameValid && streetValid && postalValid && cityValid;

    const submitHandler = (e) => {
        e.preventDefault();
        if(!formValid){
            return;
        };
        const userData = {
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        };

        props.onConfirm(userData);
        resetName();
        resetStreet();
        resetPostal();
        resetCity();
    };

    return <form onSubmit={submitHandler} className={classes.form}>
        <div className={`${classes.control} ${nameClass}`}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' value={enteredName} onChange={nameChangeHandler} onBlur={nameBlurHandler}></input>
            {nameInvalid && <p>Please input a valid name..</p>}
        </div>
        <div className={`${classes.control} ${streetClass}`}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' value={enteredStreet} onChange={streetChangeHandler} onBlur={streetBlurHandler}></input>
            {streetInvalid && <p>Please input a valid street..</p>}
        </div>
        <div className={`${classes.control} ${postalClass}`}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' value={enteredPostal} onChange={postalChangeHandler} onBlur={postalBlurHandler}></input>
            {postalInvalid && <p>Please input a valid postal..</p>}
        </div>
        <div className={`${classes.control} ${cityClass}`}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' value={enteredCity} onChange={cityChangeHandler} onBlur={cityBlurHandler}></input>
            {cityInvalid && <p>Please input a valid city..</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button disabled={!formValid}>Confirm</button>
        </div>
    </form>
};

export default Checkout;