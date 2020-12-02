import {useCallback, useState} from 'react'

type State = 'show' | 'hide'
type Configs = {
    delay: number
    transition: number
}

interface UseModal{
    (configs?: Configs): {state: State, CSSpreparer: string, showModal: () => void, closeModal: () => void}
}

const useModal: UseModal = (configs) => {
    const [state, setState] = useState<State>('show')
    const [CSSpreparer, setCSSpreparer] = useState('')

    const getDelay = (delay?: number) => delay !== undefined ? delay * 1000 + 150 : 500

    const showModal = useCallback(() => {
        if(state === 'hide'){
            setTimeout(() => setState('show'), getDelay(configs?.delay))
            setCSSpreparer(`animation: fadeIn ${configs?.transition || .5}s; animation-fill-mode: forwards;`)
        }
    },[state, configs])

    const closeModal = useCallback(() => {
        if(state === 'show'){
            setTimeout(() => setState('hide'), getDelay(configs?.delay))
            setCSSpreparer(`animation: fadeOut ${configs?.transition || .5}s; animation-fill-mode: forwards;`)
        }
    },[state, configs])

    return {state, CSSpreparer, showModal, closeModal}
}

export default useModal