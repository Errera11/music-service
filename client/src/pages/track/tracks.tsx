import React from 'react';
import Layout from "@/components/Layout";
import styles from '../../styles/tracks/tracks.module.css'
import {useRouter} from "next/router";
import {ITrack} from "@/types/track";
import TrackItem from "@/components/TrackItem";
import {useActions} from "@/hooks/useActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {NextDispatch, wrapper} from "@/store";
import {fetchTracks} from "@/store/action/tracksAC";

const Tracks = () => {
    const router = useRouter()
    const {setTrackAC, playerPlayAC, playerStopAC} = useActions()
    const {activeTrack, isPlay} = useTypedSelector(state => state.player);
    const {tracksList} = useTypedSelector(state => state.tracks);

    return (
        <>
            <Layout>
                <div className={styles.container}>
                    <div>
                        <div className={styles.title}>My Tracks</div>
                        <button onClick={() => router.push('/track/createTrack')}
                                className={styles.download}>Download
                        </button>
                    </div>
                    <div className={styles.tracks}>
                        {tracksList[0]?.map(item => (
                            <TrackItem
                                key={item.id}
                                track={item}
                                setTrack={(trackItem: ITrack) => setTrackAC(trackItem)}
                                playerPlay={playerPlayAC}
                                playerStop={playerStopAC}
                                isActive={item.id == activeTrack?.id
                                    &&
                                    isPlay}
                            />
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Tracks;

// @ts-ignore
export const getServerSideProps
    = wrapper.getServerSideProps(
    (store) =>
        async (x) => {
            const NextThunkDispatch = store.dispatch as NextDispatch;
            await NextThunkDispatch(await fetchTracks())
        })

