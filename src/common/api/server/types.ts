export interface FindTrack{
    (files: Array<File>, callback: (results: Array<FindTrackResult>) => void): void
}

export interface FindTrackResponse{
    results: Array<FindTrackResult>
}

type FindTrackResult = {
    fileName: string
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