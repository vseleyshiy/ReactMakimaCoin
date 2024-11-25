import { Dispatch, ReactNode, SetStateAction } from 'react';
import styles from './ErrorBlock.module.css';

interface Props {
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>
    children: ReactNode
}

export function ErrorBlock(props: Props) {

    const { active, setActive, children } = props

    return (
        <div className={styles.container}>
            <div className={active ? `${styles.block} ${styles.active}` : `${styles.block}`}>
                {children}
            </div>
        </div>
    )
}