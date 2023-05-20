import React from 'react';
import {ITrack} from "@/types/track";
import styles from '../styles/tracks/trackItem.module.css'
import pausePlayer from '../assets/pausePlayer.png'
import startPlayer from '../assets/startPlayer.png'
import {useRouter} from "next/router";

interface TrackItem {
    isActive?: boolean
    track: ITrack

}

const TrackItem: React.FC<TrackItem> = ({isActive, track}) => {
    const router = useRouter()
    return (
        <div className={styles.container} onClick={() => router.push('/track/' + track.id)}>
            <div>
                <div onClick={e => e.stopPropagation()}>
                    {isActive ?
                        <img src={pausePlayer.src}/>
                        :
                        <img src={startPlayer.src}/>
                    }
                    <img className={styles.image} src={track.image}/>
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>{track.name}</div>
                    <div className={styles.name}>{track.artist}</div>
                </div>
            </div>
            <div className={styles.timeline}>02:32 / 02:50</div>
        </div>
    );
};

export default TrackItem;