export interface IComment {
    id: number
    trackId: number
    username: string
    description: string
}

export interface ITrack {
    id: number
    name: string
    artist: string
    description: string
    listens: number
    image: string
    audio: string
}