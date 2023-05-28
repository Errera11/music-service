import {bindActionCreators} from "redux";
import {setTracksAC, setErrorAC}  from '../store/action/tracksAC'
import {useDispatch} from "react-redux";

export const useTracksActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators({setTracksAC, setErrorAC}, dispatch)
}