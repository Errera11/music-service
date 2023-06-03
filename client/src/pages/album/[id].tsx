import React from 'react';
import Layout from "@/components/Layout";
import axios from "axios";
import {GetServerSideProps} from "next";
import {IAlbum} from "@/types/albums";
import styles from '../../styles/albums/albumItem.module.scss'
import {ITrack} from "@/types/track";
import TrackItem from "@/components/TrackItem";
import {usePlayerActions} from "@/hooks/usePlayerActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";

const Album = ({album, albumTracks}: { album: IAlbum, albumTracks: ITrack[] }) => {

    const {setTrackAC, playerPlayAC, playerStopAC} = usePlayerActions()
    const {activeTrack, isPlay} = useTypedSelector(state => state.player)

    return (
        <Layout title={'Album'}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <img src={process.env.NEXT_PUBLIC_API_URL + '/' + album.image}/>
                    <div className={styles.name}>{album.name}</div>
                    <div className={styles.description}>{album.description}</div>
                </div>
                <div className={styles.tracks}>
                    <div className={styles.container}>
                        {albumTracks.length ?
                            <>
                                {albumTracks.map(track => <div className={styles.track}>
                                    <TrackItem
                                        isActive={track.id == activeTrack?.id && isPlay}
                                        track={track} setTrack={(track: ITrack) => setTrackAC(track)}
                                        playerPlay={playerPlayAC}
                                        playerStop={playerStopAC}/>
                                </div>)}
                            </>
                            :
                            <div>There is no tracks</div>}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Album;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {data: album} = await axios.get(`${process.env.NEXT_PUBLIC_GET_ALBUMS}/${context.params?.id}`)
    const {data: albumTracks} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}track/albumTracks/${context.params?.id}`)
    return {
        props: {
            album,
            albumTracks
        }
    }
}