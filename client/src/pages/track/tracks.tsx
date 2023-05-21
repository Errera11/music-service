import React from 'react';
import Layout from "@/components/Layout";
import styles from '../../styles/tracks/tracks.module.css'
import {useRouter} from "next/router";
import {ITrack} from "@/types/track";
import TrackItem from "@/components/TrackItem";

const TrackMock: ITrack[] = [
    {
        id: 1,
        artist: 'artis',
        description: 'this is desc',
        image: 'https://images.hdqwalls.com/wallpapers/thumb/justice-league-zack-synder-4k-jc.jpg',
        name: 'name',
        listens: 123,
        audio: 'em'
    },
    {
        id: 2,
        artist: 'artis',
        description: 'this is desc',
        image: 'https://images.hdqwalls.com/wallpapers/thumb/justice-league-zack-synder-4k-jc.jpg',
        name: 'name',
        listens: 123,
        audio: 'em'
    },
    {
        id: 3,
        artist: 'artis',
        description: 'this is desc',
        image: 'https://images.hdqwalls.com/wallpapers/thumb/justice-league-zack-synder-4k-jc.jpg',
        name: 'name',
        listens: 123,
        audio: 'em'
    },
    {
        id: 4,
        artist: 'artis',
        description: 'this is desc',
        image: 'https://images.hdqwalls.com/wallpapers/thumb/justice-league-zack-synder-4k-jc.jpg',
        name: 'name',
        listens: 123,
        audio: 'em'
    }
]

const Tracks = () => {
    const router = useRouter()
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
                            {TrackMock.map(item => (
                                <TrackItem
                                    key={item.id}
                                    track={item}
                                />
                            ))}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Tracks;