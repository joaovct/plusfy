import { useContext } from "react"
import {AlertContext} from "../providers/AlertProvider"

const useAlert = () => {
    const {createAlert} = useContext(AlertContext)

    return createAlert
}

export default useAlert