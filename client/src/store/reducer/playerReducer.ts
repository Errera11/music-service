import {ActionType, IPlayerState, PlayerActionTypes} from "@/types/player";

const initialState: IPlayerState = {
    activeTrack: null,
    volume: 50,
    duration: 0,
    isPlay: false,
    currentTime: 0
}

export const playerReducer = (state: IPlayerState = initialState, action: ActionType): IPlayerState => {
    switch (action.type) {
        case PlayerActionTypes.PLAY:
            return {...state, isPlay: true}
        case PlayerActionTypes.PAUSE:
            return {...state, isPlay: false}
        case PlayerActionTypes.SET_CURRENT_TIME:
            return {...state, currentTime: action.payload}
        case PlayerActionTypes.SET_VOLUME:
            return {...state, volume: action.payload}
        case PlayerActionTypes.SET_DURATION:
            return {...state, duration: action.payload}
        case PlayerActionTypes.SET_TRACK:
            return {...state, activeTrack: action.payload, currentTime: 0}
        default:
            return state
    }
}

