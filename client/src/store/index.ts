import {AnyAction, applyMiddleware, createStore, Store} from 'redux';
import {createWrapper, Context, HYDRATE, MakeStore} from 'next-redux-wrapper';
import {reducer, State} from "@/store/reducer";
import thunk, {ThunkDispatch} from "redux-thunk";


const makeStore = (context: Context) => createStore(reducer, applyMiddleware(thunk));

export const wrapper
    = createWrapper<Store<State>>(makeStore, {debug: true});

export type NextDispatch = ThunkDispatch<State, void, AnyAction>