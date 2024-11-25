import { RefObject, useRef } from 'react';
import styles from './Progress.module.css';
import { roles } from '../../../database'
import { UseUser } from '../../../hooks/useUser';

type Props = {
    barRef: RefObject<HTMLDivElement>
}

export function Progress(props: Props) {

    const { barRef } = props

    const { lvl } = UseUser();

    return (
        <div className={styles.progress}>
            <div className={styles.info}>
                <div className={styles.role}>
                    {roles[lvl].role}
                </div>
                <div className={styles.lvl}>
                    Level
                    <span className={styles.lvlValue}>
                        {lvl + 1}/{roles.length}
                    </span>
                </div>
            </div>
            <div className={styles.bar}>
                <div ref={barRef} className={styles.passed}></div>
            </div>
        </div >
    )
}