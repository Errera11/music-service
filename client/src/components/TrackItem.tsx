import React, {MouseEventHandler, useState} from 'react';
import {ITrack} from "@/types/track";
import styles from '../styles/tracks/trackItem.module.css'
import pausePlayer from '../assets/pausePlayer.png'
import startPlayer from '../assets/startPlayer.png'
import {useRouter} from "next/router";
import Modal from "@/components/Modal";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import axios from "axios";

interface TrackItem {
    isActive?: boolean
    track: ITrack
    setTrack: Function
    playerPlay: Function
    playerStop: Function
}

const TrackItem: React.FC<TrackItem> = ({
                                            isActive,
                                            track, setTrack,
                                            playerPlay, playerStop
                                        }) => {
    const router = useRouter()
    const [isModal, setIsModal] = useState(false)
    const setTrackHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        if (isActive) {
            playerStop()
        } else {
            setTrack(track)
            playerPlay()
        }
    }

    const addTrackAlbum = (albumId: number) => {
        axios.post(process.env.NEXT_PUBLIC_API_URL + 'track' + '/albumTrack',
            {trackId: track.id, albumId}).then(res => setIsModal(false))
            .catch(e => console.log(e))
    }

    const {albums} = useTypedSelector(state => state.albums)
    return (
        <div className={styles.container} onClick={() => router.push('/track/' + track.id)}>
            <div>
                <div onClick={setTrackHandler}>
                    {isActive ?
                        <img src={pausePlayer.src}/>
                        :
                        <img src={startPlayer.src}/>
                    }
                </div>
                <img className={styles.image} src={process.env.NEXT_PUBLIC_API_URL as string + '/' + track.image}/>

                <div className={styles.info}>
                    <div className={styles.title}>{track.name}</div>
                    <div className={styles.name}>{track.artist}</div>
                </div>
            </div>
            <div onClick={e => e.stopPropagation()}>
                <div onClick={() => setIsModal(prev => !prev)}
                     className={styles.addAlbum}>+</div>
                <Modal
                    addTrackAlbum={albumId => addTrackAlbum(albumId)}
                    setIsShow={setIsModal}
                    isShow={isModal} someList={albums.albums}/>
            </div>
        </div>
    );
};

export default TrackItem;