import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'
import { GlobalStylesContext, GlobalStyle } from '../../../common/providers/GlobalStylesProvider'

const GlobalStylesManager = () => {
    const {globalStyles} = useContext(GlobalStylesContext)
    const {pathname} = useLocation()

    return(
        <GlobalStyles
            globalStyles={globalStyles}
            pathname={pathname}
        />
    )
}

const GlobalStyles = createGlobalStyle<{globalStyles: GlobalStyle[], pathname: string}>`
    ${({globalStyles, pathname}) => {
        function filterStyles(item: GlobalStyle):boolean{
            if((item.configs.exactPath && item.route === pathname) || (!item.configs.exactPath && item.route.indexOf(pathname)))
                return true
            return false
        }
        return globalStyles.filter(filterStyles).map(item => item.css).join()
    }}
`

export default GlobalStylesManager