import { useContext, createContext, useReducer } from 'react';

const GlobalStateContext = createContext();
const DispatchStateContext = createContext();

export function GlobalContextWrapper({children}) {
    const basket = {
        count: 0,
        infos: {},
    }

    const [state, dispatch] = useReducer((state,new_value) => ({...state, ...new_value}), basket);


    return (
        <GlobalStateContext.Provider value={state}>
            <DispatchStateContext.Provider value={dispatch}>
            {children}
            </DispatchStateContext.Provider>
        </GlobalStateContext.Provider>
    )
} 

export function useGlobalContext() {
    return ([
        useContext(GlobalStateContext),
        useContext(DispatchStateContext)
    ]
    )
}