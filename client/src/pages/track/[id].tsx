import React, {useState} from 'react';
import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import styles from '../../styles/tracks/trackPage.module.scss'
import axios from "axios";
import {IComment} from "@/types/track";
import CommentItem from "@/components/CommentItem";
import {GetServerSideProps} from "next";
import {Context} from "next-redux-wrapper";

interface IServerTrack {
    "id": number
    "name": string
    "artist": string
    "description": string
    "listens": number
    "image": string
    "audio": string
    "comments": IComment[] | null
}

const TrackPage = ({track}: {track: IServerTrack} ) => {
    const router = useRouter()
    const {id} = router.query
    const [username, setUsername] = useState('')
    const [comment, setComment] = useState('')
    const [commentList, setCommentsList] = useState(track.comments || [])

    const addComment = () => {
        try {
            axios.post(`${process.env.NEXT_PUBLIC_GET_TRACKS}/comment`, {trackId: id, username, description: comment})
                .then(res => {
                    setCommentsList(prev => [...prev, res.data])
                    setComment('')
                    setUsername('')
                })
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <Layout title={`${track.name} ${track.artist}`}>
            <div className={styles.container}>
                <button onClick={() => router.push('/track/tracks')}>To list </button>
                <div className={styles.head}>
                    <div className={styles.trackImage}>
                        <img  src={process.env.NEXT_PUBLIC_API_URL + '/' +  track?.image}/>
                    </div>
                    <div className={styles.info}>
                        <div>{track.name}</div>
                        <div>{track?.artist}</div>
                        <div>Listens - {track?.listens}</div>
                    </div>
                </div>
                <div className={styles.description}>
                    <h3>Description</h3>
                    <div>{track?.description}</div>
                </div>
                <div className={styles.commentList}>
                    {commentList?.map(item => <CommentItem
                        key={item.id}
                        username={item.username}
                        description={item.description}
                    />)}
                </div>
                <div className={styles.comment}>
                    <div>Comment</div>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type={'text'} placeholder={'Your username'}/>
                    <input
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        type={'text'} placeholder={'Comment'}/>
                    <input
                        style={{cursor:'pointer'}}
                        onClick={addComment}
                        type={'submit'} value={'Send message'}/>
                </div>
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<Context> = async (context) => {
    const {data: track} = await axios.get(process.env.NEXT_PUBLIC_GET_TRACKS + '/' +  context.params.id)
    return {
        props: {track}
    }
}

export default TrackPage;