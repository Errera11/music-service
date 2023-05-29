import {useState} from "react";


interface IProps {
    search: Function
}


let timer: Function | null = null;
const Search: React.FC<IProps> = ({search}) => {
    const [value, setValue] = useState<string>()
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if(timer) clearTimeout(timer);
        if(value) timer = setTimeout(() => search(value), 1000);
        else clearTimeout(timer);

    }
    return (
        <div>
            Search <input
                style={{padding: '15px', border: '3px solid gray', borderRadius: '5px',}}
                type={'text'} placeholder={'Search'} value={value} onChange={onChangeHandler}/>
        </div>
    );
};

export default Search;