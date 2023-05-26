import React, {ReactElement} from 'react';
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";

const Layout = ({children}: any) => {
    const {activeTrack,
        isPlay,
        currentTime,
        duration,
        volume} = useTypedSelector(state => state.player)
    const {playerStopAC, playerPlayAC} = useActions()
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Player track={activeTrack}
                    isPlay={isPlay}
                    currentTime={currentTime}
                    duration={duration}
                    volume={volume}
                    setPlayerPause={playerStopAC}
                    setPlayerPlay={playerPlayAC}
            ></Player>
        </>
    );
};

export default Layout;