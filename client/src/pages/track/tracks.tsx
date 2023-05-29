import React, {Dispatch, useState} from 'react';
import Layout from "@/components/Layout";
import styles from '../../styles/tracks/tracks.module.css'
import {useRouter} from "next/router";
import {ITrack, TrackActions} from "@/types/track";
import TrackItem from "@/components/TrackItem";
import {usePlayerActions} from "@/hooks/usePlayerActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {NextDispatch, wrapper} from "@/store";
import {fetchTracks, searchTracks} from "@/store/action/tracksAC";
import Search from "@/components/Search";
import {useDispatch} from "react-redux";


const Tracks = () => {
    const router = useRouter()
    const {setTrackAC, playerPlayAC, playerStopAC} = usePlayerActions()
    const {activeTrack, isPlay} = useTypedSelector(state => state.player);
    const {tracksList} = useTypedSelector(state => state.tracks);
    const dispatch = useDispatch() as NextDispatch;
    console.log(tracksList);
    const search = async (searchQuery: string) => {
        try {
            await dispatch(await searchTracks(searchQuery))
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Layout title={'Tracks List'}>
                <>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '30px 0px'}}>
                        <Search search={search}/></div>
                    <div className={styles.container}>
                        <div>
                            <div className={styles.title}>My Tracks</div>
                            <button onClick={() => router.push('/track/createTrack')}
                                    className={styles.download}>Download
                            </button>
                        </div>
                        <div className={styles.tracks}>
                            {tracksList?.map(item => (
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
                </>
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

