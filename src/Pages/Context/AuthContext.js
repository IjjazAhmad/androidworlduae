import React, { useReducer, useEffect, createContext, useContext, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, firestore } from '../../config/firebase'
import { toast } from 'react-toastify'
import { doc, getDoc } from 'firebase/firestore'
export const AuthContext = createContext()

const intialstate = { isAuthenticated: false, user: {} }

const reducer = ((state, { type, payload }) => {

    switch (type) {
        case "LOGIN":
            return { isAuthenticated: true, user: payload.user }
        case "LOGOUT":
            return intialstate
        default:
            return state
    }

})

export const AuthContextProvider = (props) => {
    const [isAppLoading, setIsAppLoading] = useState(true)
    const [state, dispatch] = useReducer(reducer, intialstate)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                readUserProfile(user)

            } else {
                setIsAppLoading(false)
            }
        });

    }, [])

    const readUserProfile = async (user) => {
        const docRef = doc(firestore, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const user = docSnap.data()


            dispatch({ type: "LOGIN", payload: { user } })

        } else {
            toast.error("User data not found", { position: "bottom-left" })
        }
        setIsAppLoading(false)
    }


    return (
        <AuthContext.Provider value={{ ...state, dispatch, isAppLoading, readUserProfile }}>
            {props.children}
        </AuthContext.Provider>
    )
}
