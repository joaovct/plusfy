import { useContext } from "react"
import {AlertContext} from "../providers/AlertProvider"

const useAlert = () => useContext(AlertContext)

export default useAlert