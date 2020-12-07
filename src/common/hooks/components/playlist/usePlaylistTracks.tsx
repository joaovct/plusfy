import React, { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AdditionalColumn, AdditionalTrackRowOption } from "../../../../components/common/ListTracks/types"
import ContextPlaylist from '../../../../components/playlist/ContextPlaylist';
import { IStore } from '../../../../redux/store/types';
import { IUser } from '../../../../redux/store/user/types';
import { Track } from "../../../api/webapi/types"
import {Calendar} from 'react-feather'
import { formatAddedAt } from '../../../helpers/helperPlaylistTable';
import useDisabledTracks from '../../state/useDisabledTracks';
import { isTrackDisabled } from '../../../api/disabledTracks/disabledTracks';
import { addToQueue } from '../../../api/webapi/player';
import { IToken } from '../../../../redux/store/token/types';
import useAlert from '../useAlert';
import { removeTracksPlaylist } from '../../../api/webapi/playlists';

interface HookProps{
    (): {
        tracks: Track[]
        additionalColumns: AdditionalColumn[]
        additionalOptions: AdditionalTrackRowOption[]
    }
}

const usePlaylistTracks: HookProps = () => {
    const {playlist, updatePlaylist} = useContext(ContextPlaylist)
    const actionDisableTracks = useDisabledTracks()
    const {id: userId} = useSelector<IStore, IUser>(store => store.user)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const createAlert = useAlert()

    const tracks = useMemo(() => {
        return playlist?.tracks.items.map(item => item.track) || []
    },[playlist])

    const additionalColumns = useMemo<AdditionalColumn[]>(() => [
        {
            headerContent: <Calendar/>,
            bodyContent: playlist?.tracks.items.map(item => formatAddedAt(item.added_at)) || []
        }
    ],[playlist])

    const additionalOptions = useMemo<AdditionalTrackRowOption[]>(() => {
        if(playlist){
            return [
                {
                    content: 'Remover dessa playlist',
                    onClick: async (track, index) => {
                        const status = await removeTracksPlaylist(accessToken, {playlistId: playlist.id, tracks: [{uri: track.uri, positions: [index]}]})
                        if(status === 200){
                            updatePlaylist()
                            createAlert('normal', 'Música removida dessa playlist')
                        }
                    }
                },
                {
                    content: 'Habilitar nessa playlist',
                    condition: (track) => isTrackDisabled({userId, trackURI: track.uri, playlistURI: playlist.uri}),
                    onClick: (track) => {
                        actionDisableTracks({action: 'enable', playlistURI: playlist.uri, uri: track.uri})
                    }
                },
                {
                    content: 'Adicionar à fila',
                    condition: (track) => !isTrackDisabled({userId, trackURI: track.uri, playlistURI: playlist.uri}),
                    onClick: async (track) => {
                        const res = await addToQueue({accessToken, uri: track.uri})
                        if(res?.status === 204)
                            createAlert('normal','Música adicionada à fila 🎶')
                    }
                },
                {
                    content: 'Desabilitar nessa playlist',
                    condition: (track) => !isTrackDisabled({userId, trackURI: track.uri, playlistURI: playlist.uri}),
                    onClick: (track) => {
                        actionDisableTracks({action: 'disable', playlistURI: playlist.uri, uri: track.uri})
                    }
                }
            ]
        }
        return []
    },[playlist, actionDisableTracks, userId, accessToken, createAlert, updatePlaylist])

    return {tracks, additionalColumns, additionalOptions}
}

export default usePlaylistTracks