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

export interface ITracksState {
    tracksList: TracksApiProps
    error: string
}

export enum TracksActionTypes {
    SET_TRACKS = 'SET_TRACKS',
    SET_ERROR = 'SET_ERROR'
}

export interface SetTracksAction {
    type: TracksActionTypes.SET_TRACKS
    payload: TracksApiProps
}

export interface SetErrorAction {
    type: TracksActionTypes.SET_ERROR
    payload: string
}

export interface TracksApiProps {
    totalCount: number
    tracks: ITrack[]
}

export type TrackActions = SetTracksAction | SetErrorAction
