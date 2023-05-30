import React, {memo, useEffect, useMemo, useState} from 'react';
import styles from '../styles/components/Pagination.module.scss'
import {useRouter} from "next/router";

interface IProps {
    pagesCount: number
    limit: number
}

const Pagination: React.FC<IProps> = ({pagesCount, limit}) => {
    const [currentPage, setPage] = useState(1)
    const leftSide = currentPage > 4 ? currentPage + 2 >= pagesCount ? pagesCount - 4 : currentPage - 2 : 1;
    const rightSide = currentPage > 4 ? currentPage + 3 > pagesCount ? pagesCount : currentPage + 2 : pagesCount > 4 ? 5 : pagesCount
    const pages: number[] = [];
    const router = useRouter()

    useEffect(() => {
        router.push({
            query: {
                page: currentPage,
                limit
            }
        })
    }, [currentPage])
    for (let i = leftSide; i <= rightSide; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div className={styles.container}>
                {!pages.some(item => item == 1) && <div onClick={() => setPage(1)}
                                         style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>1 ...</div>}
                {pages.map(page => <div
                    onClick={() => setPage(page)}
                    className={styles.page + ' ' + (currentPage == page && styles.active)}>
                    {page}
                </div>)}
                {!pages.some(item => item == pagesCount) && <div onClick={() => setPage(pagesCount)}
                                                       style={{
                                                           display: 'flex',
                                                           alignItems: 'center',
                                                           cursor: 'pointer'
                                                       }}>... {pagesCount}</div>}
            </div>
        </div>
    );
};

export default Pagination;