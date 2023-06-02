import React, {useState} from 'react';
import styles from '../styles/components/modal.module.scss'
import {IAlbum} from "@/types/albums";

interface IProps {
    onClick?: Function
    isShow: boolean
    setIsShow?: Function
    someList?: IAlbum[]
    someChildren?: React.ReactElement
    addTrackAlbum?: Function
}

const Modal: React.FC<IProps> = ({isShow, someList, setIsShow, addTrackAlbum}) => {
    const [activeAlbum, setActiveAlbum] = useState()

    return (
        <div className={styles.modal}
             style={{display: (!isShow ? 'none' : '')}}>
            <div className={styles.someList}>
                {someList?.map(item => <div
                onClick={() => setActiveAlbum(item.id)}
                    key={item.id} className={styles.listItem + ' ' + (activeAlbum == item.id && styles.active)}>
                        {item.name}
                    </div>
                )}
            </div>
            <div className={styles.btns}>
                <div onClick={() => addTrackAlbum(activeAlbum)}>
                    Add
                </div>
                <div onClick={() => setIsShow(false)}>
                    Cancel
                </div>
            </div>
        </div>
    );
};

export default Modal;