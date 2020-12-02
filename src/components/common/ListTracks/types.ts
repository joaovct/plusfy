import { Track } from '../../../common/api/webapi/types'

export interface ListTracksProps{
    tracks: Track[]
    includeCSS?: string
    contextUri?: string
    // disableTracks?: string
}
