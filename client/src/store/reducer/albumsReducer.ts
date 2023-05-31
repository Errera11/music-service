import {AlbumACTypes, IAlbumState, ISetAlbumAC, ISetErrorAC} from "@/types/albums";

const initialState: IAlbumState = {
    error: '',
    albums: {totalCount: 0, albums: []}
}

type actionTypes = ISetAlbumAC | ISetErrorAC

export const albumsReducer = (state: IAlbumState = initialState, action: actionTypes) : IAlbumState => {
    switch (action.type) {
        case AlbumACTypes.SET_ALBUM: {
            return {...state, albums: action.payload}
        }
        case AlbumACTypes.SET_ALBUM_ERROR: {
            return {...state, error: action.payload}
        }
        default:
            return state;
    }
}