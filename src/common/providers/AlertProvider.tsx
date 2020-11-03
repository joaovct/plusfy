import React, { createContext } from 'react'

type CallAlert = () => void

interface ContextValue{
    callAlert: CallAlert
}

export const AlertContext = createContext<ContextValue>({
    callAlert: () => {}
})

const AlertProvider = ({children}: {children: JSX.Element}) => {

    const callAlert: CallAlert = () => {}

    return(
        <AlertContext.Provider value={{callAlert}}>
            {children}
        </AlertContext.Provider>
    )
} 

export default AlertProvider