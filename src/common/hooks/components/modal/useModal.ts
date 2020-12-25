import {useState} from 'react'

export type Status = 'show' | 'hide'
type Configs = {
    initialStatus?: Status
    delay_ms?: number
    transition_ms?: number
}

interface UseModal{
    (configs?: Configs): {status: Status, cssPreparer: string, showModal: () => void, closeModal: () => void}
}

const useModal: UseModal = (configs) => {
    const [status, setStatus] = useState<Status>(configs?.initialStatus || 'show')
    const [cssPreparer, setCssPreparer] = useState('')
    const delay = configs?.delay_ms|| 500
    const transition = (configs?.transition_ms || 500) / 1000

    const showModal = () => {
        if(status === 'hide'){
            setTimeout(() => setStatus('show'), delay)
            setCssPreparer(`animation: fadeIn ${transition}s; animation-fill-mode: forwards;`)
        }
    }

    const closeModal = () => {
        if(status === 'show'){
            setTimeout(() => setStatus('hide'), delay)
            setCssPreparer(`animation: fadeOut ${transition}s; animation-fill-mode: forwards;`)
        }
    }

    return {status, cssPreparer, showModal, closeModal}
}

export default useModal