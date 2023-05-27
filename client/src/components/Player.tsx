import React, {useEffect, useState} from 'react';
import styles from '../styles/components/Player.module.scss'
import pauseButton from '../assets/pausePlayer.png'
import startButton from '../assets/startPlayer.png'
import volumeImg from '../assets/volume.png'
import {ITrack} from "@/types/track";

interface IProps {
    track: ITrack | null
    duration: number
    currentTime: number
    volume: number
    isPlay: boolean
    setPlayerPlay: Function
    setPlayerPause: Function
    setTrack: Function
    setVolume: Function
    setDuration: Function
    setCurrentTime: Function
}

let audio: HTMLAudioElement;

const Player: React.FC<IProps> = ({track, ...rest}) => {

    if (!track) return <></>

    useEffect(() => {
        if(!audio) {
            audio = new Audio()
            setAudio()
        } else {
            setAudio()
        }
    }, [track])

    const setAudio = () => {
        audio.src = process.env.NEXT_PUBLIC_API_URL + '/' + track.audio;

        audio.onloadedmetadata = () => rest.setDuration(audio.duration)
        audio.ontimeupdate = () => rest.setCurrentTime(audio.currentTime)

        audio.volume = rest.volume / 100;

        audio.play();
    }

    const setTrackHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        if (rest.isPlay) {
            rest.setPlayerPause()
            audio.pause()
        } else {
            rest.setPlayerPlay()
            audio.play()
        }
    }

    const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        rest.setVolume(Number(e.target.value))
        audio.volume = Number((rest.volume / 100).toFixed(1))
    }

    const onChangeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        rest.setCurrentTime(Number(e.target.value))
        audio.currentTime = rest.currentTime;
    }

    const mmSsFormat = (value: number): string => {
        const totalSeconds = Math.round(value)
        const seconds = totalSeconds % 60;
        const minutes = (totalSeconds - totalSeconds % 60) / 60;
        return `${minutes}:${seconds > 9 ? seconds : '0' + seconds}`
    }

    return (
        <div className={styles.container}>
            <div onClick={setTrackHandler}>
                {rest.isPlay ? <img width={35} src={pauseButton.src} onClick={() => rest.setPlayerPause()}/>
                    :
                    <img src={startButton.src} width={35} onClick={() => rest.setPlayerPlay()}/>
                }
            </div>
            <div className={styles.info}>
                <div>{track.name}</div>
                <div>{track.artist}</div>
            </div>
            <div className={styles.progress}>
                <input
                    onChange={onChangeCurrentTime}
                    style={{width: '500px'}}
                    value={rest.currentTime}
                    min={0} max={rest.duration} type={'range'}/>
                <div>{mmSsFormat(rest.currentTime)} / {mmSsFormat(rest.duration)}</div>
            </div>
            <div className={styles.volume}>
                <img src={volumeImg.src}/>
                <input
                    onChange={onChangeVolume}
                    value={rest.volume} min={0} max={100} type={'range'}/>
            </div>
        </div>
    );
};

export default Player;