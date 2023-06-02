import React from 'react';
import Layout from "@/components/Layout";
import styles from '../../styles/albums/album.module.scss'
import {NextDispatch, wrapper} from "@/store";
import axios from "axios";
import {IAlbumApi} from "@/types/albums";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Link from "next/link";
import {setAlbumsAC} from "@/store/action/albumsAC";
import {useRouter} from "next/router";

const Albums = () => {
    const router = useRouter()
    const {albums} = useTypedSelector(state => state.albums)
    return (
        <Layout title={'My Albums'}>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.btn}>
                        <div className={styles.myAlbums}>My Albums</div>
                        <div className={styles.createAlbum}>
                            <Link style={{textDecoration: 'none'}}
                                  href={'/album/createAlbum'}>Create Album</Link>
                        </div>
                    </div>

                    {!albums.totalCount && <div className={styles.noAlbums}>There is no albums yet!</div>}
                    <div className={styles.albumsContainer}>
                        {albums.albums?.map(album => <div
                            onClick={() => router.push('/album/' + album.id)}
                            className={styles.albumItem}>
                            <img src={process.env.NEXT_PUBLIC_API_URL + '/' + album.image}/>
                            <div className={styles.name}>
                                {album.name}
                            </div>
                            <div className={styles.description}>
                                {album.description}
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default Albums;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        const dispatch = store.dispatch as NextDispatch
        try {
            const {data} = await axios.get(process.env.NEXT_PUBLIC_GET_ALBUMS as string, {
                params: {
                    limit: 10,
                    offset: 0
                }
            })
            if (!data) return
            const info: IAlbumApi = {albums: data[0], totalCount: data[1]}
            await dispatch(setAlbumsAC(info))
        } catch (e) {
            console.log(e);
        }
    }
)