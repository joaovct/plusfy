import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../../redux/actions/actions'
import { IToken } from '../../../redux/store/token/types'
import { IStore } from '../../../redux/store/types'
import useAlert from '../components/alert/useAlert'
import useScript from '../useScript'

const usePlaybackSDK = () => {
    useScript('https://sdk.scdn.co/spotify-player.js')
    const [playbackReady, setPlaybackReady] = useState(false)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const dispatch = useDispatch()
    const createAlert = useAlert()

    useEffect(() => {
        if(accessToken && !playbackReady){
            window.onSpotifyWebPlaybackSDKReady = () => {
                const spotifyPlayer = new Spotify.Player({
                    name: 'Plusfy',
                    getOAuthToken: ( callback: Function ) => { callback(accessToken) }
                })
    
                spotifyPlayer.connect()

                spotifyPlayer.addListener('account_error', () => createAlert('error', 'Ocorreu um erro ao inicializar o player.'))
                spotifyPlayer.addListener('authentication_error', () => createAlert('error', 'Ocorreu um erro ao inicializar o player.'))
                spotifyPlayer.addListener('initialization_error', () => createAlert('error', 'Ocorreu um erro ao inicializar o player.'))
                spotifyPlayer.addListener('playback_error', () => createAlert('error', 'Ocorreu um erro ao tocar essa música. Tente iniciar o player em outro dispositivo.'))

                spotifyPlayer.addListener('ready', () => {
                    setPlaybackReady(true)
                    
                    dispatch(actions.spotifyPlayerAction(spotifyPlayer))
                })
            }
        }
    },[accessToken, dispatch, createAlert, playbackReady])
}

export default usePlaybackSDK