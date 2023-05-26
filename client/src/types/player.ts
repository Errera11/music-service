import {ITrack} from "@/types/track";

export interface IPlayerState {
    activeTrack: null | ITrack
    duration: number
    currentTime: number
    isPlay: boolean
    volume: number
}

export interface IPlayerPauseAction {
    type: PlayerActionTypes.PAUSE
}

export interface IPlayerStartAction {
    type: PlayerActionTypes.PLAY
}

export interface IPlayerSetTrack {
    type: PlayerActionTypes.SET_TRACK
    payload: ITrack
}

export interface IPlayerSetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME
    payload: number
}

export interface IPlayerSetDurationAction {
    type: PlayerActionTypes.SET_DURATION
    payload: number
}

export interface IPlayerSetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME
    payload: number
}

export type ActionType = IPlayerPauseAction
| IPlayerStartAction
| IPlayerSetTrack
| IPlayerSetCurrentTimeAction
| IPlayerSetDurationAction
| IPlayerSetVolumeAction



export enum PlayerActionTypes {
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
    SET_CURRENT_TIME = 'SET_CURRENT_TIME',
    SET_TRACK = 'SET_TRACK',
    SET_DURATION = 'SET_DURATION',
    SET_VOLUME = 'SET_VOLUME'
}
