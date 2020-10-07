import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions/actions'
import { Itoken } from '../store/token/types'
import { Istore } from '../store/types'
import useScript from './useScript'

const usePlaybackSDK = () => {
    useScript('https://sdk.scdn.co/spotify-player.js')
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)
    const [player, setPlayer] = useState<Spotify.SpotifyPlayer>()
    const dispatch = useDispatch()

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const spotifyPlayer = new Spotify.Player({
                name: 'Plusfy',
                getOAuthToken: ( callback: Function ) => { callback(accessToken) }
            })
            setPlayer(spotifyPlayer)
        }
    },[accessToken])

    useEffect(() => {
        if(player && accessToken){
            player.connect()
            player.addListener('ready', () => dispatch(actions.playerAction(accessToken)))
        }
    },[player, accessToken, dispatch])

    return player
}

export default usePlaybackSDK