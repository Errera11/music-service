import {ITrack, SetErrorAction, SetTracksAction, TrackActions, TracksActionTypes} from "@/types/track";
import {Dispatch} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {NextDispatch} from "@/store";

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
            dispatch(setTracksAC(JSON.parse(JSON.stringify(data[0]))))
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
            dispatch(setTracksAC(data[0]))
        }
    } catch(e) {
        console.log(e);
    }
}