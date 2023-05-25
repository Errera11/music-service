import {playerReducer} from "@/store/reducer/playerReducer";
import {combineReducers} from "redux";
import {HYDRATE} from "next-redux-wrapper";

const rootReducer = combineReducers({
    player: playerReducer
})

export const reducer = (state: any, action: any) => {
    if (action.type == HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        if (state.count) nextState.count = state.count; // preserve count value on client side navigation
        return nextState;
    } else {
        return rootReducer;
    }
}

export type State = ReturnType<typeof rootReducer>

