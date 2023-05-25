import {PlayerActionTypes} from "@/types/player";
import {ITrack} from "@/types/track";

export const playerPlayAC = () => {
    return {type: PlayerActionTypes.PLAY}
}

export const playerStopAC = () => {
    return {type: PlayerActionTypes.PAUSE}
}

export const setTrackAC = (track: ITrack) => {
    return {type: PlayerActionTypes.SET_TRACK, payload: track}
}

export const setVolumeAC = (volume: number) => {
    return {type: PlayerActionTypes.SET_VOLUME, payload: volume}
}

export const setDurationAC = (duration: number) => {
    return {type: PlayerActionTypes.SET_DURATION, payload: duration}
}

export const setCurrentTimeAC = (currentTime: number) => {
    return {type: PlayerActionTypes.SET_CURRENT_TIME, payload: currentTime}
}