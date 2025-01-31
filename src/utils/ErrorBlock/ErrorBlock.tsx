import { ReactNode } from 'react';
import styles from './ErrorBlock.module.css';

interface Props {
    active: boolean
    children: ReactNode
    fontSize?: number
    padding?: number
}

export function ErrorBlock(props: Props) {

    const { active, children, fontSize, padding } = props

    return (
        <div className={styles.container}>
            <div style={{
                fontSize: fontSize,
                padding: padding,
            }} className={active ? `${styles.block} ${styles.active}` : `${styles.block}`}>
                {children}
            </div>
        </div>
    )
}