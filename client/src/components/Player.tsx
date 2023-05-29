import React, {useEffect, useState} from 'react';
import styles from '../styles/components/Player.module.scss'
import pauseButton from '../assets/pausePlayer.png'
import startButton from '../assets/startPlayer.png'
import volumeImg from '../assets/volume.png'
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {usePlayerActions} from "@/hooks/usePlayerActions";
import axios from "axios";

let audio: HTMLAudioElement;

const Player: React.FC = () => {
    const {
        activeTrack: track,
        isPlay,
        currentTime,
        duration,
        volume
    } = useTypedSelector(state => state.player)

    const {
        playerStopAC,
        playerPlayAC,
        setVolumeAC,
        setDurationAC,
        setCurrentTimeAC
    } = usePlayerActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            if (track) setAudio();
        } else {
            setAudio()
        }
    }, [track])

    useEffect(() => {
        if(isPlay) {
            audio.currentTime = currentTime;
            audio.play()
        }
        else audio.pause()
    }, [isPlay])

    const setAudio = () => {
        if (track) {
            audio.src = process.env.NEXT_PUBLIC_API_URL + '/' + track.audio;
            audio.currentTime = currentTime;
            audio.onloadedmetadata = () => {
                setDurationAC(audio.duration)
                if(Math.ceil(currentTime) == Math.ceil(duration)) {
                    axios.put(`${process.env.NEXT_PUBLIC_API_URL}track/listens/${track.id}`)
                }
                audio.ontimeupdate = () => {
                    setCurrentTimeAC(audio.currentTime)
                }
                audio.volume = volume / 100;
                audio.play()
            }
        }
    }

    const setTrackHandler = () => {
        if (isPlay) {
            playerStopAC()
        } else {
            playerPlayAC()
        }
    }

    const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolumeAC(Number(e.target.value))
        audio.volume = Number((volume / 100).toFixed(1))
    }

    const onChangeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTimeAC(Number(e.target.value))
        audio.currentTime = currentTime;
    }

    const mmSsFormat = (value: number): string => {
        const totalSeconds = Math.round(value)
        const seconds = totalSeconds % 60;
        const minutes = (totalSeconds - totalSeconds % 60) / 60;
        return `${minutes}:${seconds > 9 ? seconds : '0' + seconds}`
    }

    if (!track) {
        return <></>
    }

    return (
        <div className={styles.container}>
            <div onClick={setTrackHandler}>
                {isPlay ? <img width={35} src={pauseButton.src}/>
                    :
                    <img src={startButton.src} width={35}/>
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
                    value={currentTime}
                    min={0} max={duration} type={'range'}/>
                <div>{mmSsFormat(currentTime)} / {mmSsFormat(duration)}</div>
            </div>
            <div className={styles.volume}>
                <img src={volumeImg.src}/>
                <input
                    onChange={onChangeVolume}
                    value={volume} min={0} max={100} type={'range'}/>
            </div>
        </div>
    );
};

export default Player;