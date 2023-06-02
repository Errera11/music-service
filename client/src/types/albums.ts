
export interface IAlbumApi {
    albums: IAlbum[]
    totalCount: number
}

export interface IAlbumState {
    albums: IAlbumApi
    error: string
}

export interface IAlbum {
    id: number
    name: number
    description: number
    image: string
}

export interface IAlbumTrack {
    id: number
    track_id: number
    album_id:number
}

export interface ISetAlbumAC {
    type: AlbumACTypes.SET_ALBUM
    payload: IAlbumApi
}

export interface ISetErrorAC {
    type: AlbumACTypes.SET_ALBUM_ERROR
    payload: string
}

export enum AlbumACTypes {
     SET_ALBUM = 'SET_ALBUM',
    SET_ALBUM_ERROR = 'SET_ALBUM_ERROR'
}