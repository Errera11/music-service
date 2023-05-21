import React from 'react';
import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {ITrack} from "@/types/track";
import styles from '../../styles/tracks/trackPage.module.scss'

const TrackPage: React.FC = () => {
    const router = useRouter()
    const {id} = router.query

    const track: ITrack = {
        id: 1,
        artist: 'artis',
        description: 'this is desc',
        image: 'https://images.hdqwalls.com/wallpapers/thumb/justice-league-zack-synder-4k-jc.jpg',
        name: 'name',
        listens: 123,
        audio: 'em'
    };
    return (
        <Layout>
            <div className={styles.container}>
                <button onClick={() => router.push('/track/tracks')}>To list </button>
                <div className={styles.head}>
                    <img src={track.image}/>
                    <div className={styles.info}>
                        <div>{track.name}</div>
                        <div>{track.artist}</div>
                        <div>Listens - {track.listens}</div>
                    </div>
                </div>
                <div className={styles.description}>
                    <h3>Description</h3>
                    <div>{track.description}</div>
                </div>
                <div className={styles.comment}>
                    <div>Comment</div>
                    <input type={'text'} placeholder={'Your username'}/>
                    <input type={'text'} placeholder={'Comment'}/>
                    <input type={'submit'} value={'Send message'}/>
                </div>
            </div>
        </Layout>
    );
};

export default TrackPage;