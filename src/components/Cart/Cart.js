import React, { useContext, useState, Fragment } from 'react';
import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

import classes from './Cart.module.css';
import useFetch from '../../hooks/use-fetch';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [checkoutFinish, setCheckoutFinish] = useState(false);

    const [err, isLoading, sendRequest] = useFetch();
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartAddHandler = (cartItem) => {
        cartCtx.addItem({
            ...cartItem,
            amount: 1
        });
    };

    const cartRemoveHandler = (cartItemId) => {
        cartCtx.removeItem(cartItemId);
    };

    const orderClickHandler = () => {
        setIsCheckout(true);
    };
    
    const cancelHandler = () => {
        setIsCheckout(false);
    };

    const checkoutHandler = async (userData) => {
        const cartItems = cartCtx.items;
        await sendRequest({
            uri: 'https://learn-react-movies-905c4-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                items: cartItems,
                user: userData
            })
        })
        setCheckoutFinish(true);
        cartCtx.resetItem();
    };

    
    const cartItems = <ul>
        {cartCtx.items.map(cart => {
            return <CartItem key={cart.id} name={cart.name} price={cart.price} amount={cart.amount} onRemove={cartRemoveHandler.bind(null, cart.id)} onAdd={cartAddHandler.bind(null, cart)}></CartItem>
        })
    }
    </ul>;

    const cartAction =  <Fragment>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onOpenCloseModal}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderClickHandler} >Order</button>}
        </div>
    </Fragment>

    const modalContent = <Modal onOpenClose={props.onOpenCloseModal}>
        <div className={classes.cartBody}>
        {cartItems}
        </div>
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={checkoutHandler} onCancel={cancelHandler}/>}
        {!isCheckout && cartAction}
    </Modal>;

    let ctx;
    if(isLoading){
        ctx = <Modal>
            <p>Sending your order..</p>
        </Modal>
    };

    if(err){
        ctx = <Modal>
            <p>{err}</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onOpenCloseModal}>Close</button>
            </div>
        </Modal>
    };

    if(checkoutFinish && !err){
        ctx = <Modal>
            <p>Order Has Been Made!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onOpenCloseModal}>Close</button>
            </div>
        </Modal>
    };

    return <Fragment>
        {!checkoutFinish && modalContent}
        {checkoutFinish && ctx}
    </Fragment>
};

export default Cart;
 