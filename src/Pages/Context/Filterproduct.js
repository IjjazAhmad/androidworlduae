import { useContext, createContext, useEffect, useReducer } from 'react';

import { useProductContext } from './ProductContext';

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    gridview: true,
    short_value: "lowest",
    filters: {
        text: "",
        sidetext: "",
        category: "All",
        company: "All",
        maxprice: 0,
        price: 0,
        minprice: 0,
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_FILTER_PRODUCT':

            let pricearr = action.payload.map((curss) => curss.price)

            let totalprice = Math.max(...pricearr)


            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: { ...state.filters, maxprice: totalprice, minprice: totalprice, price: totalprice },
            };
        case 'SET_GRID_VIEW':
            return {
                ...state,
                gridview: true,
            };
        case 'SET_LIST_VIEW':
            return {
                ...state,
                gridview: false,
            };
        case 'UPDATE_FILTER_VALUE':
            let { name, value } = action.payload

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value
                }
            };
        case 'FILTER_PRODUCT':
            let { all_products } = state;
            let tempfilterproduct = [...all_products];
            let { text, category, company, price } = state.filters;

            if (text) {
                tempfilterproduct = tempfilterproduct.filter((curelem) => {
                    return curelem.name.toLowerCase().includes(text)
                })
            }
            if (company !== "All") {
                tempfilterproduct = tempfilterproduct.filter((curelems) => {
                    return curelems.company.toLowerCase() === company.toLowerCase();
                })
            }

            if (category !== "All") {
                tempfilterproduct = tempfilterproduct.filter((curelems) => {
                    return curelems.selectedcategory === category;
                })
            }
            if (price === 0) {
                tempfilterproduct = tempfilterproduct.filter((curelems) => {
                    return curelems.price > price;
                })
            } else {
                tempfilterproduct = tempfilterproduct.filter((curelems) => {
                    return curelems.price <= price;
                })
            }

            return {
                ...state,
                filter_products: tempfilterproduct,
            };
        case "GET_SORT_VALUE":
            let usersortvalue = document.getElementById("sort");
            let sort_valu = usersortvalue.options[usersortvalue.selectedIndex].value;
            return {
                ...state,
                short_value: sort_valu,
            };
        case "SORTING_PRODUCTS":
            let newSortData;
            let tempsortproduct = [...action.payload];

            if (state.short_value === "lowest") {
                const shortingProducts = (a, b) => {
                    return a.price - b.price;
                }
                newSortData = tempsortproduct.sort(shortingProducts)
            }

            if (state.short_value === "highest") {
                const shortingProducts = (a, b) => {
                    return b.price - a.price;
                }
                newSortData = tempsortproduct.sort(shortingProducts)
            }
            if (state.short_value === "a-z") {

                newSortData = tempsortproduct.sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
            }
            if (state.short_value === "z-a") {

                newSortData = tempsortproduct.sort((a, b) => {
                    return b.name.localeCompare(a.name)
                })
            }

            return {
                ...state,
                filter_products: newSortData,
            };
        default:
            return state;
    }
};

export const FilterContextProvider = ({ children }) => {
    const { Product } = useProductContext();

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: 'LOAD_FILTER_PRODUCT', payload: Product });

    }, [Product]);

    const setGridView = () => {
        dispatch({ type: "SET_GRID_VIEW" })
    }

    const setListView = () => {
        dispatch({ type: "SET_LIST_VIEW" })

    }

    const updatefiltervalue = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        dispatch({ type: "UPDATE_FILTER_VALUE", payload: { name, value } })

    }

    useEffect(() => {
        dispatch({ type: 'FILTER_PRODUCT' });
    }, [state.filters]);

    useEffect(() => {
        dispatch({
            type: 'SORTING_PRODUCTS', payload: Product
        });
    }, [state.short_value]);

    const shorting = () => {
        dispatch({ type: "GET_SORT_VALUE" })

    }

    return (
        <FilterContext.Provider value={{ ...state, dispatch, setGridView, setListView, shorting, updatefiltervalue }}>
            {children}
        </FilterContext.Provider>
    );
};

const useFilterProductContext = () => {
    return useContext(FilterContext);
};

export { useFilterProductContext };
