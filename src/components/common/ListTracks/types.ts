import { FlattenInterpolation, FlattenSimpleInterpolation } from 'styled-components'
import { Track } from '../../../common/api/webapi/types'
import { SavedTracks } from '../../../common/api/webapi/types'

export interface ListTracksProps{
    tracks: Track[]
    additionalColumns?: AdditionalColumn[]
    additionalCSS?: string
    contextUri?: string
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
    additionalColumns?: AdditionalColumn[]
}

export type HandleToggleOption = (index: number) => void