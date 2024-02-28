
import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { firestore } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const AppContext = createContext();


const initailState = {

    isLoading: false,

    isErrer: false,

    products: [],

    categories: [],

    orders: [],

    users: [],

}

const reduser = (state, action) => {

    switch (action.type) {

        case "SET_LOADING":

            return {

                ...state,

                isLoading: true,

            };
        case "API_ERROR":

            return {

                ...state,

                isLoading: false,

                isErrer: true,

            };
        case "SET_API_DATA":


            return {

                ...state,

                isLoading: false,

                products: action.payload,

            };
        case "SET_LOADING":

            return {

                ...state,

                isLoading: true,

            };
        case "SET_CATEGORY_DATA":

            return {

                ...state,

                categories: action.payload,

            };
        case "SET_ORDER_DATA":
            return {
                ...state,
                orders: action.payload,

            };
        case "SET_USER_DATA":
            return {

                ...state,
                users: action.payload,
            };
        default:
            return state;
    }
}

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reduser, initailState)
    const [Product, setproduct] = useState([])

    useEffect(() => {
        fetchDoc()
        fetchOrder()
        fetchUsers()
        fetchCategory()
    }, [])

    const fetchOrder = async () => {
        let arry = []

        const querySnapshot = await getDocs(collection(firestore, "orders"));
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            arry.push(data)
        });
        dispatch({ type: "SET_ORDER_DATA", payload: arry });
    }
    const fetchUsers = async () => {
        let arry = []

        const querySnapshot = await getDocs(collection(firestore, "Users"));
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            arry.push(data)
        });
        dispatch({ type: "SET_USER_DATA", payload: arry });
    }
    const fetchDoc = async () => {
        dispatch({ type: "SET_LOADING" })
        try {
            let products = []
            const querySnapshot = await getDocs(collection(firestore, "Products"));
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                products.push(data)
            });
            setproduct(products)
            dispatch({ type: "SET_API_DATA", payload: products });
        } catch (err) {
            dispatch({ type: "API_ERROR" })
        }
    }
    const fetchCategory = async () => {
        try {
            let category = []
            const querySnapshot = await getDocs(collection(firestore, "Category"));
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                category.push(data)
            });
            dispatch({ type: "SET_CATEGORY_DATA", payload: category });
        } catch (err) {
        }
    }
    return (

        <AppContext.Provider value={{ ...state, Product, dispatch }}>

            {children}

        </AppContext.Provider>

    )

}

const useProductContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useProductContext }
