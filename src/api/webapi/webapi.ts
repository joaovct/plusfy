export * from './playlists'

export const formatAddedAt = (trackAddedAt: string) => {
    const date = new Date(trackAddedAt)
    return date.toLocaleDateString('pt-br', {month: 'short', day: '2-digit', year: '2-digit'})
}

export const formatDuration = (duration: number) => {
    const totalSeconds = Math.floor( duration / 1000 )
    let seconds = (Math.floor( totalSeconds % 60 )).toString()
    let minutes = (Math.floor( totalSeconds / 60 )).toString()
    let hours = Math.floor( totalSeconds / 3600 )

    if(seconds === '0') seconds = '00'
    if(minutes === '0') minutes = '00'

    return `${hours ? `${hours}:` : ''}${minutes}:${seconds}` 
}