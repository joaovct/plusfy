import { useCallback, useEffect, useState } from "react"
import { StatusImport } from "../../../../components/importTracks/types"
import { compareTwoFiles, getTrackFileMetaData, preventRepeatedFile } from "../../../helpers/helperImportTracks"

export type FilePreview = {
    name: string
    size: number
    type: string
    imgURL?: string
} | null

export interface RemoveFile{
    (filePreview: FilePreview): void
}

interface OnDrop{
    (newFiles: File[]): void
}

interface UseFilesProps{
    statusImport: StatusImport
    actionFinishResetImportTracks: Function
}

interface UseFilesReturn{
    droppedFiles: File[]
    filesPreview: FilePreview[]
    removeFile: RemoveFile
    onDrop: OnDrop
}

const useFilesPreview = ({statusImport, actionFinishResetImportTracks}: UseFilesProps): UseFilesReturn => {
    const [droppedFiles, setDroppedFiles] = useState<File[]>([])
    const [filesPreview, setFilesPreview] = useState<FilePreview[]>([])

    useEffect(() => {
        Promise.all(droppedFiles.map(getMetaData)).then(setFilesPreview)
    },[droppedFiles])

    useEffect(() => {
        if(statusImport === 'reseting'){
            setDroppedFiles([])
            setFilesPreview([])
            actionFinishResetImportTracks()
        }
    },[statusImport, actionFinishResetImportTracks])

    const onDrop = useCallback<OnDrop>((newFiles: File[]) => {
        const newDroppedFiles = preventRepeatedFile(droppedFiles, newFiles)
        setDroppedFiles(newDroppedFiles)
        Promise.all(newDroppedFiles.map(getMetaData)).then(setFilesPreview)
    },[droppedFiles])

    const getMetaData = (droppedFile: File) => new Promise<FilePreview>(resolve =>
        getTrackFileMetaData(droppedFile, (err, metadata) => {
            if(err){
                console.error(metadata)
                return resolve(null)
            }
            let imgURL = undefined
            if(metadata.picture[0]){
                const blob = new Blob([metadata.picture[0].data], {type: `image/${metadata.picture[0].format}`})
                imgURL = window.URL.createObjectURL(blob)
            }
            resolve({name: droppedFile.name, type: droppedFile.type, size: droppedFile.size, imgURL})
        })
    )

    const removeFile: RemoveFile = (filePreview) => {
        if(filePreview)
            setDroppedFiles(droppedFiles => droppedFiles.filter(droppedFile => !compareTwoFiles(droppedFile, filePreview)))
    }

    return {droppedFiles, filesPreview, onDrop, removeFile}
}

export default useFilesPreview