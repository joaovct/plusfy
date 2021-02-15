import { useLocation } from "react-router-dom"


const useQuery = () => {
    return Object.fromEntries(new URLSearchParams(useLocation().search))
}

export default useQuery