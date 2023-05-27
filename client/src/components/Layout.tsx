import React from 'react';
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import {ITrack} from "@/types/track";

const Layout = ({children}: any) => {

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
    } = useActions()

    return (
        <>
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