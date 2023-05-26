import React from 'react';
import styles from '../styles/components/Player.module.scss'
import pauseButton from '../assets/pausePlayer.png'
import startButton from '../assets/startPlayer.png'
import volume from '../assets/volume.png'
import {IPlayerState} from "@/types/player";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import {ITrack} from "@/types/track";

interface IProps {
    track: ITrack | null
    duration: number
    currentTime: number
    volume: number
    isPlay: boolean
    setPlayerPlay: Function
    setPlayerPause: Function
}

const Player: React.FC<IProps> = ({track, ...rest}) => {
    if (!track) return <></>
    // const track = {
    //     id: 1,
    //         artist: 'artis',
    //     description: 'this is desc',
    //     image: 'https://images.hdqwalls.com/wallpapers/thumb/justice-league-zack-synder-4k-jc.jpg',
    //     name: 'name',
    //     listens: 123,
    //     audio: 'em'
    // }
    return (
        <div className={styles.container}>
                {rest.isPlay ? <img src={pauseButton.src} onClick={() => rest.setPlayerPause()}/>
                    :
                    <img src={startButton.src} onClick={() => rest.setPlayerPlay()}/>
                }
            <div className={styles.info}>
                <div>{track.name}</div>
                <div>{track.artist}</div>
            </div>
            <div className={styles.progress}>
                <input style={{width: '500px'}} value={10} min={0} max={100} type={'range'}/>
                <div>2:33 / 5:00</div>
            </div>
            <div className={styles.volume}>
                <img src={volume.src}/>
                <input value={10} min={0} max={100} type={'range'}/>
                <div>2:33 / 5:00</div>
            </div>
        </div>
    );
};

export default Player;