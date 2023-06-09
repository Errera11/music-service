import '../styles/global.css';
import {Provider} from "react-redux";
import {wrapper} from "@/store";
import {AppProps} from "next/app";

const MyApp: React.FC<AppProps> = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Component {...props.pageProps} />
        </Provider>
    );
};

export default MyApp