import { Rocket, Zap } from 'lucide-react'
import styles from './Energy.module.css'
import { UseUser } from '../../../hooks/useUser'
import { MutableRefObject, RefObject, useState } from 'react'

interface Props {
    boostRef: RefObject<HTMLDivElement>
    mainRef: RefObject<HTMLDivElement>
}

export function Energy(props: Props) {
    const { energy, maxEnergy } = UseUser()

    const { boostRef, mainRef } = props;


    const openBoostMenu = () => {
        if (!boostRef.current) return
        if (!mainRef.current) return
        boostRef.current.style.display = 'flex';
        mainRef.current.style.display = 'none';
    }

    return (
        <div className={styles.energy}>
            <ul className={styles.list}>
                <div className={styles.item}>
                    <Zap />
                    <span className={styles.value}>
                        {energy} / {maxEnergy}
                    </span>
                </div>
                <div className={styles.item} onClick={openBoostMenu}>
                    <Rocket />
                    <span className={styles.value}>
                        Boost
                    </span>
                </div>
            </ul>
        </div>
    )
}