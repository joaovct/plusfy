import { FindTrackResult } from "../api/server/types"
import searchItem from "../api/webapi/search"
import {FoundTrack} from '../../components/importTracks/types'

interface PreventRepeatedFile{
    (droppedFiles: Array<File>, newFiles: Array<File>): Array<File>
}

type ComparedFile ={
    name: string
    type: string
    size: number
}

export const compareTwoFiles = (file1: ComparedFile, file2: ComparedFile) => file1.name === file2.name && file1.type && file2.type && file1.size === file2.size ? true : false

export const preventRepeatedFile: PreventRepeatedFile = (droppedFiles, newFiles) => {
    return [...droppedFiles, ...newFiles.filter(newFile => {
        let repeated = false
        for(let i = 0; i < droppedFiles.length; i++){
            if(compareTwoFiles(droppedFiles[i], newFile)){
                repeated = true
                break
            }
        }        
        return !repeated
    })]
}

const mm = require('musicmetadata/dist/musicmetadata')

interface GetTrackFileMetaData{
    (file: File, callback: (error: Error, metadata: Metadata) => void): void
}

export const getTrackFileMetaData: GetTrackFileMetaData = (file, callback) => {
    const reader = new FileReader()
    reader.onload = function(){
        mm(this.result, callback)
    }
    reader.readAsArrayBuffer(file)
}

export interface Metadata {
    artist: string[];
    album: string;
    albumartist: string[];
    title: string;
    year: string;
    track: NoOf;
    disk: NoOf;
    genre: string[];
    picture: Picture[];
    duration: number;
}

interface NoOf {
    no: number;
    of: number;
}

interface Picture {
    format: string;
    data: Buffer;
}

export const searchFoundTrack = (track: FindTrackResult, accessToken: string) => {
    return new Promise<FoundTrack>( async (resolve, reject) => {
        const finalTrack: FoundTrack = {
            file: {
                fieldname: track.file.fieldname,
                type: track.file.mimetype,
                size: track.file.size
            },
            track: null,
            search: null
        }

        if(track.track){
            finalTrack.search = `${track.track.name} ${track.track.artists?.length ? track.track.artists[0].name : ' '}` 
            const query = `${track.track.name} ${track.track.artists?.length ? `artist:${track.track?.artists[0].name}` : ''}`
            const searchResult = await searchItem(accessToken, query, 'track')
            
            if(searchResult.tracks?.items.length){
                finalTrack.track = searchResult.tracks?.items[0]
                return resolve(finalTrack)
            }
        }

        const file = new File([new Uint8Array(track.file.buffer.data)], track.file.fieldname, {type: track.file.mimetype})
        
        getTrackFileMetaData(file, async (err, metadata) => {
            if(err){
                reject(err)
            }

            const search = `${metadata.title} ${metadata.artist[0]}`
            const query = `${metadata.title} artist:${metadata.artist[0]}`
            const searchResult = await searchItem(accessToken, query, 'track')
            if(searchResult.tracks?.items.length)
                return resolve({...finalTrack, search, track: searchResult.tracks?.items[0]})
            resolve(finalTrack)
        })
    })
}