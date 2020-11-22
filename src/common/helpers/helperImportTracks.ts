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
        droppedFiles.forEach(droppedFile => {
            repeated = compareTwoFiles(droppedFile, newFile)
        })
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