import React, {useMemo} from 'react';
import styles from '../styles/components/Pagination.module.scss'

interface IProps {
    pagesCount: number
    currentPage: number
    setPage: Function
}

const Pagination: React.FC<IProps> = ({pagesCount, currentPage, setPage}) => {
    const leftSide = currentPage > 4 ? currentPage + 2 >= pagesCount ? pagesCount - 4 : currentPage - 2: 1;
    const rightSide = currentPage > 4 ?  currentPage + 3 > pagesCount ? pagesCount : currentPage + 2 : 5;
    const pages: number[] = [];
    for (let i = leftSide; i <= rightSide; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div className={styles.container}>
                {currentPage >= 5 && <div onClick={() => setPage(1)}
                    style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>1 ...</div>}
                {pages.map(page => <div
                    onClick={() => setPage(page)}
                    className={styles.page + ' ' + (currentPage == page && styles.active)}>
                    {page}
                </div>)}
                {currentPage <= pagesCount - 3 && <div onClick={() => setPage(pagesCount)}
                    style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>... {pagesCount}</div>}
            </div>
        </div>
    );
};

export default Pagination;