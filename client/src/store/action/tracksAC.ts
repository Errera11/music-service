import {ITrack, SetErrorAction, SetTracksAction, TrackActions, TracksActionTypes} from "@/types/track";
import {Dispatch} from "react";
import axios from "axios";

export const setTracksAC = (payload: ITrack[]) : SetTracksAction => {
    return {payload, type: TracksActionTypes.SET_TRACKS}
}

export const setErrorAC = (payload: string): SetErrorAction => {
    return {payload, type: TracksActionTypes.SET_ERROR}
}

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackActions>)=> {
        try {
            const {data} = await axios.get(process.env.NEXT_PUBLIC_GET_TRACKS as string)
            dispatch(setTracksAC(JSON.parse(JSON.stringify(data))))
        } catch (e) {
            dispatch(setErrorAC(e as string))
        }
    }
}