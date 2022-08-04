import React, { useRef, useState }from "react";

import Input from "../../UI/Input";

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const [formValid, setFormValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const amountInputValue = +amountInputRef.current.value;

        if(amountInputValue.length === 0 || amountInputValue < 0  || amountInputValue > 5){
            setFormValid(false);
            return ;
        };

        props.onAddToCart(amountInputValue)
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountInputRef} label="Amount" input={{id: 'amount_' + props.id, type: 'number', min:'1', max: '5', defaultValue: 1}} />
            <button>+ Add</button>
            {!formValid && <p>Please enter an valid amount</p>}
        </form>
    );
};

export default MealItemForm;