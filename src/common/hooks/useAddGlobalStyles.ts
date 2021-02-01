import { useContext } from "react"
import { AddGlobalStyle, GlobalStylesContext } from "../providers/GlobalStylesProvider"

const useAddGlobalStyles  = (): AddGlobalStyle => {
    const {addGlobalStyle} = useContext(GlobalStylesContext)

    return addGlobalStyle
}

export default useAddGlobalStyles