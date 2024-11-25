import { BatteryCharging, ChevronRight, CircleDollarSign, MousePointerClick } from 'lucide-react';
import styles from './List.module.css';
import { Modal } from '../../../utils/Modal/Modal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { boosts, roles } from '../../../database';
import { UseUser } from '../../../hooks/useUser';
import { ErrorBlock } from '../../../utils/ErrorBlock/ErrorBlock';

interface Props {
    setWidth: Dispatch<SetStateAction<number>>
}

export function List(props: Props) {

    const { lvl, balance, setBalance, lvlClick, setLvlClick, lvlMaxEnergy, setLvlMaxEnergy, setMaxEnergy } = UseUser();

    const { setWidth } = props

    // console.log(boosts.MaxEnergy[lvlMaxEnergy - 1].price);
    // console.log(boosts.MaxEnergy[lvlMaxEnergy - 1].energy);

    const [activeTap, setActiveTap] = useState(false);
    const [activeMaxEnergy, setActiveMaxEnergy] = useState(false);

    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('')

    // console.log(boosts.Multitap[boosts.Multitap.length - 1].click)
    // console.log(boosts.Multitap[lvlClick - 1].click)

    const lastLvlClick = boosts.Multitap[boosts.Multitap.length - 1].click;
    const lastLvlEnergy = boosts.MaxEnergy[boosts.MaxEnergy.length - 1].energy;

    const haveMoney = (lastLvl: number, price: number, value: number, setFunc: Dispatch<SetStateAction<number>> | null, func?: Dispatch<SetStateAction<number>> | null) => {
        if (value === lastLvl) {
            setErrorText('Вы достигли максимального уровня!');
            setError(true);
        } else {
            // boosts.multitap[lvlclick].price
            if (balance >= price) { // если баланс больше или равен цене
                setBalance?.(prev => prev - price); // снимаем с баланса цену товара
                setFunc?.(prev => prev + 1);
                func?.(value); // увеличиваем значение
                let cut = (balance / roles[lvl].for_up) * 100;
                setWidth(cut);
            } else {
                setErrorText('У вас недостаточно монет!');
                setError(true);
            }
        }

    }

    // проверки

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError(false);
        }, 5000);

        return () => clearTimeout(timeout)
    }, [error])

    return (
        <>
            <ErrorBlock active={error} setActive={setError}>
                {errorText}
            </ErrorBlock>
            <ul className={styles.list}>
                <li className={styles.item} onClick={() => setActiveTap(true)} >
                    <div className={styles.content}>
                        <MousePointerClick size={40} />
                        <div className={styles.main}>
                            <div className={styles.title}>Multitap</div>
                            <div className={styles.info}>
                                <div className={styles.price}>
                                    {boosts.Multitap[lvlClick - 1].click === lastLvlClick ? "" : <CircleDollarSign size={20} />}
                                    {boosts.Multitap[lvlClick - 1].click === lastLvlClick ? "-" : boosts.Multitap[lvlClick - 1].price}
                                </div>
                                <div className={styles.lvl}>
                                    {boosts.Multitap[lvlClick - 1].click === lastLvlClick ? `${lvlClick} lvl max` : `${lvlClick + 1} lvl`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ChevronRight />
                </li>
                <li className={styles.item} onClick={() => setActiveMaxEnergy(true)}>
                    <div className={styles.content}>
                        <BatteryCharging size={40} />
                        <div className={styles.main}>
                            <div className={styles.title}>Energy limit</div>
                            <div className={styles.info}>
                                <div className={styles.price}>
                                    {boosts.MaxEnergy[lvlMaxEnergy - 1].energy === lastLvlEnergy ? "" : <CircleDollarSign size={20} />}
                                    {boosts.MaxEnergy[lvlMaxEnergy - 1].energy === lastLvlEnergy ? "-" : boosts.MaxEnergy[lvlMaxEnergy - 1].price}
                                </div>
                                <div className={styles.lvl}>
                                    {boosts.MaxEnergy[lvlMaxEnergy - 1].energy === lastLvlEnergy ? `${lvlMaxEnergy} lvl max` : `${lvlMaxEnergy + 1} lvl`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ChevronRight />
                </li>
            </ul>
            <Modal modalActive={activeTap} setModalActive={setActiveTap}>
                <MousePointerClick size={60} />
                <div className={styles.menu__title}>
                    Multitap
                </div>
                <div className={styles.text}>
                    Увеличьте количество монет, которое вы можете заработать за одно нажатие
                </div>
                <div className={styles.desc}>
                    +1 монет за улучшение при клике
                </div>
                <div className={styles.info}>
                    <div className={styles.menu__price}>
                        {boosts.Multitap[lvlClick - 1].click === lastLvlClick ? "" : <CircleDollarSign size={30} />}
                        {boosts.Multitap[lvlClick - 1].click === lastLvlClick ? "-" : boosts.Multitap[lvlClick - 1].price}
                    </div>
                    <div className={styles.menu__lvl}>
                        {boosts.Multitap[lvlClick - 1].click === lastLvlClick ? `${lvlClick} lvl max` : `${lvlClick + 1} lvl`}
                    </div>
                </div>
                <button
                    style={{
                        pointerEvents: boosts.Multitap[lvlClick - 1].click === lastLvlClick ? 'none' : 'all',
                    }}
                    onClick={() => {
                        haveMoney(lastLvlClick, boosts.Multitap[lvlClick - 1].price,
                            boosts.Multitap[lvlClick - 1].click,
                            setLvlClick);
                        setActiveTap(false);
                    }} className={`${styles.submit} ${boosts.Multitap[lvlClick - 1].click === lastLvlClick && styles.ex}`}>
                    {boosts.Multitap[lvlClick - 1].click === lastLvlClick ? 'Вы достигли макс. уровня' : 'Улучшить'}
                </button>
            </Modal>
            <Modal modalActive={activeMaxEnergy} setModalActive={setActiveMaxEnergy}>
                <BatteryCharging size={60} />
                <div className={styles.menu__title}>
                    Energy limit
                </div>
                <div className={styles.text}>
                    Увеличьте максимальное количество энергии
                </div>
                <div className={styles.desc}>
                    +500 энергии за улучшение
                </div>
                <div className={styles.info}>
                    <div className={styles.menu__price}>
                        {boosts.MaxEnergy[lvlMaxEnergy - 1].energy === lastLvlEnergy ? "" : <CircleDollarSign size={30} />}
                        {boosts.MaxEnergy[lvlMaxEnergy - 1].energy === lastLvlEnergy ? "-" : boosts.MaxEnergy[lvlMaxEnergy - 1].price}
                    </div>
                    <div className={styles.menu__lvl}>
                        {boosts.MaxEnergy[lvlMaxEnergy - 1].energy === lastLvlEnergy ? `${lvlMaxEnergy} lvl max` : `${lvlMaxEnergy + 1} lvl`}
                    </div>
                </div>
                <button
                    style={{
                        pointerEvents: boosts.MaxEnergy[lvlMaxEnergy - 1].energy === lastLvlEnergy ? 'none' : 'all',
                    }}
                    onClick={() => {
                        haveMoney(lastLvlEnergy, boosts.MaxEnergy[lvlMaxEnergy - 1].price,
                            boosts.MaxEnergy[lvlMaxEnergy - 1].energy,
                            setLvlMaxEnergy, setMaxEnergy);
                        setActiveMaxEnergy(false);
                    }} className={`${styles.submit} ${boosts.MaxEnergy[lvlMaxEnergy - 1].energy === lastLvlEnergy && styles.ex}`}>
                    {boosts.MaxEnergy[lvlMaxEnergy - 1].energy === lastLvlEnergy ? 'Вы достигли макс. уровня' : 'Улучшить'}
                </button>
            </Modal>
        </>
    )
}

// таймер поломался, убрать ошибку о макс лвл и просто запретить нажимать на кнопку улучшить