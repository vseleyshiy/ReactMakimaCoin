import { useState } from 'react'
import styles from './Score.module.css'
import { CircleDollarSign } from 'lucide-react';

interface Props {
    balance: number
}

export function Score(props: Props) {

    const { balance } = props;

    return (
        <h1 className={styles.text}>
            <CircleDollarSign size={35} />
            {balance}
        </h1>
    )
}