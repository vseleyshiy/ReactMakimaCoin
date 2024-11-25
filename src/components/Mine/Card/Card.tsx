import { CircleDollarSign } from 'lucide-react';
import { PropsCard } from '../types';
import styles from './Card.module.css';

export function Card(props: PropsCard) {

    const { data } = props

    return (
        <>
            <div className={styles.main}>
                {/* <div className={styles.main__col}>
                    <div className={styles.img__wrap}>
                        <img src={data.img} className={styles.img} />
                    </div>
                </div> */}
                <div className={styles.main__col}>
                    <div className={styles.name}>
                        {data.name}
                    </div>
                    <div className={styles.profit}>
                        Прибыль в час
                        <div className={styles.profit__value}>
                            <CircleDollarSign size={11} />
                            {data.allProfit}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.lvl}>
                    lvl {data.lvl}
                </div>
                <div className={styles.price}>
                    <CircleDollarSign size={22} />
                    {data.price}
                </div>
            </div>
        </>
    )
}