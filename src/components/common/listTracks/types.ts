import { FlattenInterpolation, FlattenSimpleInterpolation, ThemedStyledProps } from 'styled-components'
import { Track } from '../../../common/api/webapi/types'
import { SavedTracks } from '../../../common/api/webapi/types'

export type ListTracksViewMode = 'simplified' | 'full'

export interface ListTracksProps{
    tracks: Track[]
    contextUri?: string
    additionalColumns?: AdditionalColumn[]
    additionalCSS?: string | FlattenSimpleInterpolation | FlattenInterpolation<ThemedStyledProps<any, any>>
    additionalTrackRowOptions?: AdditionalTrackRowOption[]
    viewMode?: ListTracksViewMode
    showHeader?: boolean
}

export interface AdditionalTrackRowOption{
    content: string | JSX.Element
    onClick: (track: Track, index: number) => void
    condition?: (track: Track, index: number) => void
}

export interface AdditionalColumn{
    headerContent: string | JSX.Element
    bodyContent: string[] | JSX.Element[]
}

export interface ContextListTracksProps{
    handleToggleOption: HandleToggleOption
    toggleOptions: boolean[]
    savedTracks: SavedTracks | null
    updateSavedTracks: () => void
    contextUri?: string
    additionalColumns?: AdditionalColumn[]
    additionalTrackRowOptions?: AdditionalTrackRowOption[]
    viewMode: ListTracksViewMode
    showHeader?: boolean
}

export type HandleToggleOption = (index: number) => void