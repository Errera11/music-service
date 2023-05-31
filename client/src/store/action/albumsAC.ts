import {AlbumACTypes, IAlbum, IAlbumApi, ISetAlbumAC, ISetErrorAC} from "@/types/albums";


export const setAlbumsAC = (payload: IAlbumApi) : ISetAlbumAC=> {
    return {payload, type: AlbumACTypes.SET_ALBUM}
}

export const setErrorAC = (payload: string) : ISetErrorAC=> {
    return {payload, type: AlbumACTypes.SET_ALBUM_ERROR}
}