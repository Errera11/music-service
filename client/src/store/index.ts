import {createStore, Store} from 'redux';
import {createWrapper, Context, HYDRATE, MakeStore} from 'next-redux-wrapper';
import {reducer, State} from "@/store/reducer";

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const wrapper
    = createWrapper<Store<State>>(makeStore, {debug: true});