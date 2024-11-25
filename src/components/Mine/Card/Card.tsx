import { Apple, CircleDollarSign, LucideProps } from 'lucide-react';
import styles from './Card.module.css';
import React, { ReactNode } from 'react';

interface Props {
    data: {
        id: number
        name: string
        desc: string
        lvl: number
        profit: number
        allProfit: number
        price: number
        img: string
    }
}

export function Card(props: Props) {

    const { data } = props

    return (
        <>
            <div className={styles.main}>
                <div className={styles.main__col}>
                    <div className={styles.img__wrap}>
                        <img src={data.img} className={styles.img} />
                    </div>
                </div>
                <div className={styles.main__col}>
                    <div className={styles.name}>
                        {data.name}
                        {/* staking */}
                    </div>
                    <div className={styles.profit}>
                        Прибыль в час
                        <div className={styles.profit__value}>
                            <CircleDollarSign size={15} />
                            {data.allProfit}
                            {/* 13,52K */}
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
                    {/* 1,16M */}
                </div>
            </div>
        </>
    )
}