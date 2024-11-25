import { RefObject, useState } from 'react'
import styles from './Buttons.module.css'
import { Coins, Home, Pickaxe } from 'lucide-react'

interface Props {
    boostRef: RefObject<HTMLDivElement>
    mainRef: RefObject<HTMLDivElement>
    earnRef: RefObject<HTMLDivElement>
    mineRef?: RefObject<HTMLUListElement>
}

export function Buttons(props: Props) {

    const { boostRef, mainRef, mineRef, earnRef } = props

    const openMainMenu = () => {
        if (!boostRef.current) return
        if (!mainRef.current) return
        if (!earnRef.current) return
        mainRef.current.style.display = 'flex';
        boostRef.current.style.display = 'none';
        earnRef.current.style.display = 'none';
    }

    const openEarnMenu = () => {
        if (!boostRef.current) return
        if (!mainRef.current) return
        if (!earnRef.current) return
        earnRef.current.style.display = 'flex';
        boostRef.current.style.display = 'none';
        mainRef.current.style.display = 'none';
    }

    const [mineRefOpen, setMineRefOpen] = useState(false);

    const openMineMenu = () => {
        if (!mineRef?.current) return;
        if (mineRefOpen) {
            mineRef.current.style.display = 'none';
            setMineRefOpen(false);
        } else {
            mineRef.current.style.display = 'flex';
            setMineRefOpen(true);
        }
    }

    return (
        <ul className={styles.list}>
            <li className={styles.item} onClick={openMainMenu}>
                <div className={styles.link}>
                    <Home size={20} />
                    Home
                </div>
            </li>
            <li className={styles.item} onClick={openMineMenu}>
                <div className={styles.link}>
                    <Pickaxe size={20} />
                    Mine
                </div>
            </li>
            <li className={styles.item} onClick={openEarnMenu}>
                <div className={styles.link}>
                    <Coins size={20} />
                    Earn
                </div>
            </li>
        </ul>
    )
}