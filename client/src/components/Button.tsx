import React from 'react';
import styles from '../styles/components/button.module.css'

interface IProps {
    children: string
    onClick: () => void

}

const Button: React.FC<IProps> = ({children, onClick}) => {
    return (
        <div className={styles.btn} onClick={() => onClick()}>
            {children}
        </div>
    );
};

export default Button;