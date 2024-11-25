import { Rocket, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SwitchWindow } from '../../../utils/Functions/SwitchWindow';
import { IEnergy, Props } from '../types';
import styles from './Energy.module.css';
import { UseUser } from '../../../hooks/useUser';
import { boosts } from '../../../database';

export function Energy(props: Props & IEnergy) {

    const { setMenu, maxEnergy, setMaxEnergy, energy, setEnergy } = props;

    const { lvlMaxEnergy } = UseUser();

    // installation energy after authenticate
    useEffect(() => {
        const energyNum = lvlMaxEnergy == 1 ? 2000 : boosts.MaxEnergy[lvlMaxEnergy - 1].energy;

        setMaxEnergy?.(energyNum);
    }, [lvlMaxEnergy])

    useEffect(() => {
        setEnergy(maxEnergy);
    }, [maxEnergy])

    // add energy with help of interval
    const [addEnergy, setAddEnergy] = useState(true);

    useEffect(() => {
        if (energy >= maxEnergy) {
            setAddEnergy(false);
        } else {
            setAddEnergy(true);
        }
    }, [energy])

    useEffect(() => {
        if (addEnergy) {
            const interval = setInterval(() => {
                setEnergy?.(prev => prev + 10);
            }, 3000)

            return () => clearInterval(interval);
        }
    }, [addEnergy])

    return (
        <div className={styles.energy}>
            <ul className={styles.list}>
                <div className={styles.item}>
                    <Zap />
                    <span className={styles.value}>
                        {energy} / {maxEnergy}
                    </span>
                </div>
                <div onClick={() => {
                    SwitchWindow(setMenu, { boost: true, buttons: true });
                }} className={styles.item}>
                    <Rocket />
                    <span className={styles.value}>
                        Boost
                    </span>
                </div>
            </ul>
        </div>
    )
}