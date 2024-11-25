import { CircleDollarSign } from 'lucide-react';
import { UseUser } from '../../../hooks/useUser';
import styles from './Score.module.css';

export function Score() {
    const { balance } = UseUser();

    return (
        <h1 className={styles.text}>
            <CircleDollarSign size={35} />
            {balance}
        </h1>
    )
}