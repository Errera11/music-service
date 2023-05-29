import {ITracksState, TrackActions, TracksActionTypes} from "@/types/track";

const initialState: ITracksState = {
    tracksList: {totalCount: 0, tracks: []},
    error: ''
}

export const tracksReducer = (state = initialState, action: TrackActions): ITracksState => {
    switch (action.type) {
        case TracksActionTypes.SET_TRACKS:
            return {...state, tracksList: action.payload}
        case TracksActionTypes.SET_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}