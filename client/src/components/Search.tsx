import {useEffect, useState} from "react";


interface IProps {
    search: Function
}


let timer: Function | null;
const Search: React.FC<IProps> = ({search}) => {
    const [value, setValue] = useState<string>()

    useEffect(() => {
        if(timer) clearTimeout(timer.toString());
        timer = setTimeout(() => search(value), 1000);
    }, [value])

    return (
        <div>
            Search <input
                style={{padding: '15px', border: '3px solid gray', borderRadius: '5px',}}
                type={'text'} placeholder={'Search'} value={value} onChange={e => setValue(e.target.value)}/>
        </div>
    );
};

export default Search;