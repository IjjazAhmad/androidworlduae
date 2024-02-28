import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { toast } from 'react-toastify';
const CartContext = createContext()

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("EcomCart");

    if (!localCartData || JSON.parse(localCartData).length === 0) {
        return []
    } else {
        return JSON.parse(localCartData);
    }
};

const initialState = {
    cart: getLocalCartData(),
    total_amount: 0,
    amount: 0,
    total_price: 0,
    shippingfee: 50000,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":

            let { amount, product } = action.payload;

            let allreadyincart = state.cart.find((curElem) => curElem.id === product.id)

            if (allreadyincart) {
                let updatedproduct = state.cart.map((curItem) => {
                    if (curItem.id === product.id) {
                        let newAmount = curItem.amount + amount;
                        return {
                            ...curItem,
                            amount: newAmount
                        }
                    } else {
                        return curItem;

                    }
                });
                return {
                    ...state,
                    cart: updatedproduct,
                }

            } else {
                let CartProduct;

                CartProduct = {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    max: product.stock,
                    price: product.price,
                    amount
                }

                return {
                    cart: [...state.cart, CartProduct],
                }
            }

        case "REMOVE_ITEM":

            let updatedCart = state.cart.filter(
                (curItem) => curItem.id != action.payload
            );
            return {
                ...state,
                cart: updatedCart,
            };
        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
            };
        case "SET_DECREMENT":
            let updatedproduct = state.cart.map((curElem) => {
                if (curElem && curElem.id === action.payload) {
                    let decAmount = curElem.amount - 1;
                    if (decAmount <= 1) {
                        decAmount = 1;
                    }
                    return {
                        ...curElem,
                        amount: decAmount,
                    };
                } else {
                    return curElem;
                }
            });
            return { ...state, cart: updatedproduct };
        case "SET_INCREMENT":
            let updatedProducts = state.cart.map((curElem) => {
                if (curElem.id === action.payload) {
                    let incAmount = curElem.amount + 1;

                    if (incAmount >= curElem.max) {
                        incAmount = curElem.max;
                    }

                    return {
                        ...curElem,
                        amount: incAmount,
                    };
                } else {
                    return curElem;
                }
            });
            return { ...state, cart: updatedProducts };
        case "CART_TOTAL_PRICE":
            let total_price = state.cart.reduce((initialVal, curElem) => {
                let { price, amount } = curElem;

                initialVal = initialVal + price * amount;
                return initialVal;
            }, 0);
            let total_amount = state.cart.reduce((initialVal, curElem) => {
                let { amount } = curElem;
                initialVal = initialVal + amount;
                return initialVal;
            }, 0);

            return {
                ...state,
                total_price,
                total_amount
            };

        default:
            return state;
    }
}

export function CartContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addtoCart = (amount, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { amount, product } });
        toast.success(`Product Is SuccessFully Add In Cart`, { position: "bottom-left" })
    };

    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };
    const setDecrement = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id });
    };

    const setIncrement = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id });
    };
    useEffect(() => {
        dispatch({ type: "CART_TOTAL_PRICE" });
        localStorage.setItem("HaramCart", JSON.stringify(state.cart));
    }, [state.cart]);


    return (
        <CartContext.Provider value={{ ...state, dispatch, removeItem, setIncrement, setDecrement, clearCart, addtoCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
}