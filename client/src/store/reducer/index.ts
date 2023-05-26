import {playerReducer} from "@/store/reducer/playerReducer";
import {combineReducers} from "redux";
import {HYDRATE} from "next-redux-wrapper";
import {IPlayerState} from "@/types/player";

const rootReducer = combineReducers({
    player: playerReducer
})

export const reducer = (state: any, action: any): State => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        if (state.count) nextState.count = state.count; // preserve count value on client side navigation
        return nextState;
    } else {
        return rootReducer(state, action);
    }
}

export type State = ReturnType<typeof rootReducer>

