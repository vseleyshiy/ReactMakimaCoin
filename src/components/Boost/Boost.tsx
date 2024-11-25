import { Dispatch, MutableRefObject, RefObject, SetStateAction } from 'react';
import { UseUser } from '../../hooks/useUser';
import { Buttons } from '../Main/Buttons/Buttons';
import { Score } from '../Main/Score/Score';
import styles from './Boost.module.css';
import { List } from './List/List';

interface Props {
    setWidth: Dispatch<SetStateAction<number>>
    boostRef: RefObject<HTMLDivElement>
    mainRef: RefObject<HTMLDivElement>
    earnRef: RefObject<HTMLDivElement>
}

export function Boost(props: Props) {

    const { setWidth, boostRef, mainRef, earnRef } = props

    const { balance } = UseUser();

    return (
        <div className={styles.boostWrap} ref={boostRef}>
            <div className={styles.balance__title}>Ваш баланс</div>
            <Score balance={balance} />
            <div className={styles.boost}>
                <div className={styles.title}>Усилители</div>
                <List setWidth={setWidth} />
            </div>
            <Buttons boostRef={boostRef} mainRef={mainRef} earnRef={earnRef} />
        </div>
    )
}