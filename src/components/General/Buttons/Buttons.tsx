import { Coins, Home, Pickaxe } from 'lucide-react';
import { SwitchWindow } from '../../../utils/Functions/SwitchWindow';
import { Props } from '../types';
import styles from './Buttons.module.css';

export function Buttons(props: Props) {

    const { menu, setMenu, style } = props;

    return (
        <ul className={styles.list} style={style}>
            <li className={styles.item} onClick={() => {
                SwitchWindow(setMenu, { home: true, buttons: true });
            }}>
                <div className={styles.link}>
                    <Home size={20} />
                    Home
                </div>
            </li>
            <li className={styles.item} onClick={() => {
                SwitchWindow(setMenu, { home: true, mine: !menu?.mine, buttons: true });
            }}>
                <div className={styles.link}>
                    <Pickaxe size={20} />
                    Mine
                </div>
            </li>
            <li className={styles.item} onClick={() => {
                SwitchWindow(setMenu, { earn: true, buttons: true });
            }}>
                <div className={styles.link}>
                    <Coins size={20} />
                    Earn
                </div>
            </li>
        </ul>
    )
}