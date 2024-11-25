import { CircleDollarSign } from 'lucide-react'
import styles from './Blocks.module.css'
import { roles } from '../../../database'
import { UseUser } from '../../../hooks/useUser'

export function Blocks() {

    const { lvl, lvlClick, hourProfit } = UseUser();

    return (
        <ul className={styles.list}>
            <li className={styles.item}>
                <div className={styles.title}>
                    Прибыль за тап
                </div>
                <div className={styles.value}>
                    <CircleDollarSign size={18} />
                    <span className={styles.valueNum}>
                        +{lvlClick}
                    </span>
                </div>
            </li>
            <li className={styles.item}>
                <div className={styles.title}>
                    Монет для апа
                </div>
                <div className={styles.value}>
                    <span className={styles.valueNum}>
                        {roles[lvl].for_up}
                    </span>
                </div>
            </li>
            <li className={styles.item}>
                <div className={styles.title}>
                    Прибыль в час
                </div>
                <div className={styles.value}>
                    <CircleDollarSign size={18} />
                    <span className={styles.valueNum}>
                        +{hourProfit}
                    </span>
                </div>
            </li>
        </ul>
    )
}