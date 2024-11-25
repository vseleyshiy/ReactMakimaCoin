import { Score } from '../General/Score/Score';
import { Props } from '../General/types';
import styles from './Boost.module.css';
import { List } from './List/List';

export function Boost(props: Props) {

    const { style, setMaxEnergy } = props;

    return (
        <div className={styles.boostWrap} style={style}>
            <div className={styles.balance__title}>Ваш баланс</div>
            <Score />
            <div className={styles.boost}>
                <div className={styles.title}>Усилители</div>
                <List setMaxEnergy={setMaxEnergy} />
            </div>
        </div>
    )
}