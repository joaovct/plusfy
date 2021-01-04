import React, { createContext, useState } from 'react'

export type TypeAlert = 'success' | 'warning' | 'error' | 'normal'
type MessageAlert = string | JSX.Element
interface ConfigsAlert{
    timing_sec: number
    backgroundColor?: string
}

type CreateAlert = (type: TypeAlert, message: MessageAlert, configs?: ConfigsAlert) => void
type RemoveAlert = (index: number) => void
type Alert = {type: TypeAlert, message: MessageAlert, configs: ConfigsAlert}

interface ContextValue{
    createAlert: CreateAlert
    removeAlert: RemoveAlert
    alerts: Alert[]
}

export const AlertContext = createContext<ContextValue>({
    createAlert: () => {},
    removeAlert: () => {},
    alerts: []
})

const AlertProvider = ({children}: {children: JSX.Element}) => {
    const [alerts, setAlerts] = useState<Alert[]>([])

    const createAlert: CreateAlert = (type, message, configs = {timing_sec: 3}) => {
        setAlerts(old => [...old, {type, message, configs}])
    }
    const removeAlert: RemoveAlert = (index) => setAlerts(old => old.filter((_, i) => i !== index))

    return(
        <AlertContext.Provider value={{createAlert, removeAlert, alerts}}>
            {children}
        </AlertContext.Provider>
    )
} 

export default AlertProvider