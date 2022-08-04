import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
        if(action.type === "ADD_ITEM"){
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

            const exisitingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
            const existingCartItem = state.items[exisitingCartItemIndex];

            let updatedItems;

            if(existingCartItem){
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount
                };
                updatedItems = [...state.items];
                updatedItems[exisitingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            };

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount  
            };
        };

        if(action.type === "REMOVE_ITEM"){
            //
            const exisitingCartItemIndex = state.items.findIndex(item => item.id === action.itemId);
            const existingItem = state.items[exisitingCartItemIndex];

            const updatedTotalAmount = state.totalAmount - existingItem.price;

            let updatedItems;
            //Check if amount equally to one 
            if(existingItem.amount === 1){
                updatedItems = state.items.filter((item) => {
                    return item.id !== existingItem.id
                });
            } else {
                const updatedItem = {...existingItem, amount: existingItem.amount - 1};
                updatedItems = [...state.items];
                updatedItems[exisitingCartItemIndex] = updatedItem
            };
            return {items: updatedItems, totalAmount: updatedTotalAmount}
        };

        if(action.type === "RESET_ITEM"){
            return defaultCartState
        };

    return defaultCartState
};
//Provide the Cart Context
const CartProvider = (props) => {

    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

    const addItemToCart = (item) => {
        dispatchCart({type: "ADD_ITEM", item: item})
    };

    const removeItemFromCart = (id) => {
        dispatchCart({type: "REMOVE_ITEM", itemId: id})
    };

    const resetItemFromCart = () => {
        dispatchCart({type: "RESET_ITEM"});
    };

    return <CartContext.Provider value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        resetItem: resetItemFromCart
    }}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;