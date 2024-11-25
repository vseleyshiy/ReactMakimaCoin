import { RefObject, useEffect, useRef, useState } from 'react';
import styles from './Progress.module.css';
import { roles } from '../../../database'
import { UseUser } from '../../../hooks/useUser';
import axios from 'axios';

export function Progress() {

    const { id, lvl, setLvl, balance, setBalance, lvlClick, hourProfit } = UseUser();

    // function for backend balance
    const addBalance = async () => {
        const data = {
            status: 'balance',
            id: id,
            balance: balance,
        }
        await axios.post('https://reactmakimacoin.local/src/api/update.php', `data=${JSON.stringify(data)}`)
    }

    // function for backend lvl
    const upLvl = async () => {
        const data = {
            status: 'lvl',
            id: id,
            lvl: lvl,
        }
        await axios.post('https://reactmakimacoin.local/src/api/update.php', `data=${JSON.stringify(data)}`)
    }

    // timer for send request about change balance, delay = 10 sec
    const [timer, setTimer] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(true);
        }, 10000);

        return () => clearInterval(interval);
    }, [])

    // add balance on useEffect
    useEffect(() => {
        const interval = setInterval(() => {
            setBalance?.(prev => prev + ((lvlClick * 5) + Math.floor(hourProfit / 60 / 15)));
        }, 3000);

        return () => clearInterval(interval);
    }, [])

    // function to change the progress bar
    const barRef = useRef<HTMLDivElement>(null);

    const changeProgress = () => {
        if (!barRef.current) return;
        let cut = (balance / roles[lvl].for_up) * 100;
        barRef.current.style.width = `${cut}%`;
    }

    // changing the progress bar with balance changes
    useEffect(() => {
        if (balance >= Number(roles[lvl].for_up)) {
            setLvl?.(prev => prev + 1);
        }
        setTimer(false);
        changeProgress();
        if (timer) {
            addBalance();
        }
    }, [balance])

    useEffect(() => {
        changeProgress();
        upLvl();
    }, [lvl])

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