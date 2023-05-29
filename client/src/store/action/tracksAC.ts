import {SetErrorAction, SetTracksAction, TrackActions, TracksActionTypes, TracksApiProps} from "@/types/track";
import {Dispatch} from "react";
import axios from "axios";



export const setTracksAC = (payload: TracksApiProps) : SetTracksAction => {
    return {payload, type: TracksActionTypes.SET_TRACKS}
}

export const setErrorAC = (payload: string): SetErrorAction => {
    return {payload, type: TracksActionTypes.SET_ERROR}
}

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackActions>)=> {
        try {
            const {data} = await axios.get(process.env.NEXT_PUBLIC_GET_TRACKS as string)
            dispatch(setTracksAC({tracks: data[0], totalCount: data[1]}))
        } catch (e) {
            dispatch(setErrorAC(e as string))
        }
    }
}

export const searchTracks = (searchQuery: string) => {
    try {
        return async (dispatch: Dispatch<TrackActions>) => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_GET_TRACKS}`, {
                params: {
                    search: searchQuery
                }
            })
            dispatch(setTracksAC({tracks: data[0], totalCount: data[1]}))
        }
    } catch(e) {
        console.log(e);
    }
}