import { useContext } from "react"
import ContextMood from "../../../../components/mood/ContextMood"

const useMoodContext = () => {
    return useContext(ContextMood)
}

export default useMoodContext