import { useSelector } from "react-redux"
import { ICurrentState } from "../../../../redux/store/currentState/types"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import { nextPlayer, pausePlayer, previousPlayer, repeatPlayer, resumePlayer, shufflePlayer } from "../../../api/webapi/player"

interface Hook{
    ():{
        clickShuffle: () => void
        clickPrevious: () => void
        clickPlayPause: () => void
        clickNext: () => void
        clickRepeat: () => void
    }
}

const useNowPlayingMainButtons: Hook = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)

    function clickShuffle(){
        if(accessToken)
            shufflePlayer({accessToken, shuffle: !currentState.shuffle_state})
    }

    function clickPrevious(){
        if(accessToken)
            previousPlayer({accessToken})
    }

    function clickPlayPause(){
        if(accessToken){
            if(currentState.is_playing)
                return pausePlayer({accessToken})
            return resumePlayer({accessToken})
        }
    }

    function clickNext(){ 
        if(accessToken)
            nextPlayer({accessToken})
    }

    function clickRepeat(){
        if(accessToken){
            const states = ['off', 'context', 'track']
            for(let i = 0; i < states.length; i++){
                if(states[i] === currentState.repeat_state){
                    const state = states[i+1] || states[0]
                    repeatPlayer({accessToken, state})
                    break
                }
            }
        }
    }

    return {clickShuffle, clickPrevious, clickPlayPause, clickNext, clickRepeat}
}

export default useNowPlayingMainButtons