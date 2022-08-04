import { useState } from "react";

const useInput = (validateInput, invalidClass) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const inputValid = validateInput(enteredValue);
    const inputInvalid = isTouched && !inputValid;
    const classForInvalid = inputInvalid ? invalidClass : '';

    const onChangeHander = (e) => {
        setEnteredValue(e.target.value);
    };

    const onBlurHandler = (e) => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return [enteredValue, inputValid, inputInvalid, onChangeHander, onBlurHandler, reset, classForInvalid];
};

export default useInput;
