import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Itoken } from '../store/token/types'
import { Istore } from '../store/types'
import useScript from './useScript'

const usePlaybackSDK = () => {
    useScript('https://sdk.scdn.co/spotify-player.js')
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)
    const [player, setPlayer] = useState<Spotify.SpotifyPlayer>()

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
        if(player){
            player.addListener('ready', ({device_id}) => console.log(device_id))
            player.connect()
        }
    },[player])
}

export default usePlaybackSDK