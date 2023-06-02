import * as actions from '../store/action/albumsAC'
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

export const useAlbumsActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}