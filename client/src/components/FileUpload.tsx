import React, {useRef} from 'react';

interface IProps {
    children: React.ReactElement
    accept: string
    setFile: Function
}

const FileUpload:React.FC<IProps> = ({setFile, children, accept}) => {
    const ref = useRef<HTMLInputElement>(null)
    // @ts-ignore
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0])
    }
    return (
        <div>
            <div onClick={() => ref.current.click()}>
                <div style={{margin: '30px 0px', cursor: 'pointer', color: 'blue'}}>
                    {children}
                </div>
                <input onChange={e => onChange(e)} type={'file'} accept={accept} ref={ref} style={{"display": 'none'}}/>
            </div>
        </div>
    );
};

export default FileUpload;