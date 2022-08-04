import React, { useContext, useEffect, useState } from "react";
import CartIcon from '../Cart/CartIcon';
import CartContext from "../../store/cart-context";

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
        return currNumber + item.amount;
    }, 0);

    const [btnHighlighted, setBtnHighlighted] = useState(false);
    const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`

    useEffect(() => {
        if(cartCtx.items.length === 0) {
            return;
        };
        setBtnHighlighted(true);

        const timer = setTimeout(() => {
            setBtnHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };

    }, [cartCtx.items]);

    return (
    <button className={btnClasses} onClick={props.onOpenCloseModal}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
    )
};

export default HeaderCartButton; 