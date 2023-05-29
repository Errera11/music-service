import React from 'react';
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {usePlayerActions} from "@/hooks/usePlayerActions";
import {ITrack} from "@/types/track";
import Head from "next/head";
import cookie from '../assets/cookie.png'

interface IProps {
    title: string
    children: React.ReactElement
}

const Layout: React.FC<IProps> = ({children, title}) => {

    const {
        activeTrack,
        isPlay,
        currentTime,
        duration,
        volume
    } = useTypedSelector(state => state.player)

    const {
        playerStopAC,
        playerPlayAC,
        setTrackAC,
        setVolumeAC,
        setDurationAC,
        setCurrentTimeAC
    } = usePlayerActions()

    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="shortcut icon" href={cookie.src} />
            </Head>
            <Navbar/>
            <main>{children}</main>
            <Player track={activeTrack}
                    isPlay={isPlay}
                    currentTime={currentTime}
                    duration={duration}
                    volume={volume}
                    setPlayerPause={playerStopAC}
                    setPlayerPlay={playerPlayAC}
                    setTrack={(track: ITrack) => setTrackAC(track)}
                    setVolume={(volume: number) => setVolumeAC(volume)}
                    setDuration={setDurationAC}
                    setCurrentTime={setCurrentTimeAC}
            />
        </>
    );
};

export default Layout;