import React from 'react';
import Layout from "@/components/Layout";
import axios from "axios";
import {GetServerSideProps} from "next";
import {IAlbum} from "@/types/albums";
import styles from '../../styles/albums/albumItem.module.scss'
import {ITrack} from "@/types/track";
import TrackItem from "@/components/TrackItem";

const Album = ({album, albumTracks}: { album: IAlbum, albumTracks: ITrack[] }) => {
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
                        {albumTracks.map(track => <div className={styles.track}>
                            <TrackItem track={track} setTrack={() => 1} playerPlay={() => 1}
                                       playerStop={() => 1}/>
                        </div>)}
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