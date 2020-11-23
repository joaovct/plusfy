export interface FindTrack{
    (files: Array<File>, callback: (results: Array<FindTrackResult>) => void): void
}

export interface FindTrackResponse{
    results: Array<FindTrackResult>
}

interface MulterFile {
    buffer: {
        type: "Buffer" | string
        data: number[]
    }, 
    encoding: string, 
    fieldname: string, 
    mimetype: string, 
    originalname: string, 
    size: number;
}

export type FindTrackResult = {
    file: MulterFile
    track: {
        id: string;
        title: string;
        artists: Array<TrackArtist>;
        duration: number;
    } | null
}

export interface TrackArtist {
    id: string;
    name: string;
    joinphrase?: string;
}