import { useEffect, useRef, useState } from "react"
import { Status } from "../../../../components/mood/types"
import { timingFade } from './types'
import useMoodContext from "./useMoodContext"

interface Hook{
    ({target, active}: {target: Status, active?: boolean}): string
}

const useManageScreenMood: Hook = ({target, active: activeProp}) => {
    const [css, setCss] = useState('')
    const [,setActive] = useState(activeProp ? true : false)
    const {status} = useMoodContext()
    const isMounted = useRef(true)

    useEffect(() => () => {
        isMounted.current = false
    },[])

    useEffect(() => {
        setActive(active => {
            if(status === target && !active){
                setTimeout(() => {
                    if(isMounted.current){
                        setCss(show)
                    }
                    setTimeout(() => {
                        if(isMounted.current){
                            setCss(fadeIn)
                        }
                    }, timingFade)
                }, timingFade)
                return true
            }else if(status !== target && active){
                if(isMounted.current){
                    setCss(fadeOut)
                }
                setTimeout(() => {
                    if(isMounted.current){
                        setCss(hide)
                    }
                }, timingFade)
                return false
            }else if(status !== target && !active && isMounted.current){
                setCss(hide)
                return false
            }
            return active
        })
    },[status, target])

    return css
}

const show = `
    display: block;
    position: absolute;
    opacity: 0;
`

const fadeIn = `
    position: relative;
    opacity: 0;    
    animation: ${(timingFade - 100) / 1000}s fadeIn forwards;
`

const fadeOut = `
    position: absolute;
    opacity: 1;
    animation: ${(timingFade - 100) / 1000}s fadeOut forwards;
`

const hide = `
    display: none;
    opacity: 0;
`

export default useManageScreenMood