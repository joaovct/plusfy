import React, {createContext, useState} from 'react'

type ConfigsGlobalStyle = {
    exactPath: boolean
}

export type GlobalStyle = {
    css: string,
    route: string,
    configs: ConfigsGlobalStyle
}

export type AddGlobalStyle = (css: string, route: string, configs?: ConfigsGlobalStyle) => void

interface ContextValue{
    addGlobalStyle: AddGlobalStyle
    globalStyles: GlobalStyle[]
}

export const GlobalStylesContext = createContext<ContextValue>({
    addGlobalStyle: () => {},
    globalStyles: []
})

const GlobalStylesProvider = ({children}: {children: JSX.Element}) => {
    const [globalStyles, setGlobalStyles] = useState<GlobalStyle[]>([])

    const addGlobalStyle: AddGlobalStyle = (css, route, configs = {exactPath: true}) => {
        setGlobalStyles(current => {
            function filterItems(item: GlobalStyle):boolean{
                if(item.route === route && item.configs.exactPath === configs.exactPath){
                    return false
                }
                return true
            }
            return [...current.filter(filterItems), {css, route, configs}]
        })
    }

    return( 
        <GlobalStylesContext.Provider value={{globalStyles, addGlobalStyle}}>
            {children}
        </GlobalStylesContext.Provider>
    )
}

export default GlobalStylesProvider