import React, {useState} from 'react';
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
import Pagination from "@/components/Pagination";
import axios from "axios";
import {IAlbumApi} from "@/types/albums";
import {setAlbumsAC} from "@/store/action/albumsAC";


const Tracks = () => {
    const router = useRouter()
    const {setTrackAC, playerPlayAC, playerStopAC} = usePlayerActions()
    const {activeTrack, isPlay} = useTypedSelector(state => state.player);
    const {tracksList} = useTypedSelector(state => state.tracks);
    const dispatch = useDispatch() as NextDispatch;

    const limit = 3;
    const pagesCount = Math.ceil(tracksList.totalCount / limit)

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
                            {tracksList?.tracks.map(item => (
                                <TrackItem
                                    key={item.id}
                                    track={item}
                                    setTrack={(trackItem: ITrack) => setTrackAC(trackItem)}
                                    playerPlay={() => playerPlayAC()}
                                    playerStop={() => playerStopAC()}
                                    isActive={item.id == activeTrack?.id
                                        &&
                                        isPlay}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.paginator}>
                        <Pagination pagesCount={pagesCount} limit={limit}/>
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
            const {page = 1, limit = 3} = x.query
            const NextThunkDispatch = store.dispatch as NextDispatch;
            await NextThunkDispatch(await fetchTracks(Number(page) * Number(limit) - Number(limit), Number(limit)))
            const {data} = await axios.get(process.env.NEXT_PUBLIC_GET_ALBUMS as string, {
                params: {
                    limit: 10,
                    offset: 0
                }
            })
            if (!data) return
            const info: IAlbumApi = {albums: data[0], totalCount: data[1]}
            await NextThunkDispatch(setAlbumsAC(info))
        })

