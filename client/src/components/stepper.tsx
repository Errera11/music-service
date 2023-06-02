import React from 'react';
import styles from '../styles/components/stepper.module.scss'

interface IProps {
    activeStep: number
    children?: React.ReactElement
    steps: string[]
}

const Stepper: React.FC<IProps> = ({activeStep, children, steps}) => {
    return (
        <div className={styles.container}>
            <div className={styles.stepper}>
                {steps.map((item, index) => <div key={index} className={styles.item}>
                    <div className={(index > activeStep ?
                        styles.number : styles.number + ' ' +
                        (index == activeStep ? styles.current : styles.active))}>{index + 1}</div>
                    <div className={styles.text}>{item}</div>
                    {index != steps.length - 1 && <div className={styles.line}/>}
                </div>)}
            </div>
            <div className={styles.children}>
                {children}
            </div>

        </div>
    );
};

export default Stepper;