import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as ActionCreators from '../store/action/playerAC'

export const usePlayerActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}