import { Track } from "../../common/api/webapi/types";

export interface ContextProps{
    foundTracks: FoundTrack[]
    statusImport: StatusImport
    actionFindTrack: ActionFindTrack
    actionStartResetImportTracks: ActionStartResetImportTracks
    actionFinishResetImportTracks: ActionFinishResetImportTracks
}

export interface FoundTrack{
    file: {
        fieldname: string
        size: number
        type: string
    }
    track: Track | null
    search: string | null
}

export type StatusImport = 'none' | 'loading' | 'success' | 'error' | 'reseting'

export type ActionStartResetImportTracks = () => void
export type ActionFinishResetImportTracks = () => void
export type ActionFindTrack = (files: Array<File>) => void

export type StatusPreview = 'show' | 'hide' | 'empty'
