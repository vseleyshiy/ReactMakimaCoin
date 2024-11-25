import { Dispatch, MouseEvent, ReactNode, RefObject, SetStateAction, useCallback, useEffect, useState } from 'react'
import { cards, roles } from '../../../database'
import styles from '../../Boost/List/List.module.css'
import stylesCards from './Cards.module.css'
import { Card } from '../Card/Card'
import { Modal } from '../../../utils/Modal/Modal'
import { CircleDollarSign, TreesIcon } from 'lucide-react'
import { UseUser } from '../../../hooks/useUser'
import { ErrorBlock } from '../../../utils/ErrorBlock/ErrorBlock'

interface Props {
    mineRef: RefObject<HTMLUListElement>
    setWidth: Dispatch<SetStateAction<number>>
}

type TypeCards = {
    id: number;
    name: string;
    desc: string;
    lvl: number;
    profit: number;
    allProfit: number;
    price: number;
    img: string;
}

export function Cards(props: Props) {

    const { mineRef, setWidth } = props

    const { lvl, balance, setBalance, setHourProfit } = UseUser();

    const exampleCard: TypeCards = {
        id: 0,
        name: 'Secret Makimacoin',
        desc: 'Секретная карта, нельзя купить и поиметь с неё прибыль, это пасхалка, которую ты нашёл <3',
        lvl: 999,
        profit: 666,
        allProfit: 777,
        price: 999999,
        img: '/public/secret_card.jpg',
    }

    const [modal, setModal] = useState(false);

    const [info, setInfo] = useState({
        id: 0,
        content: exampleCard,
    })

    const getModal = () => {
        return <Modal modalActive={modal} setModalActive={setModal}>
            <div className={styles.img__wrap}>
                <img src={info.content.img} className={styles.img} />
            </div>
            <div className={styles.menu__title}>
                {info.content.name}
            </div>
            <div className={styles.text}>
                {info.content.desc}
            </div>
            <div className={styles.desc}>
                +{info.content.profit} монет в час после улучшения
            </div>
            <div className={styles.info}>
                <div className={styles.menu__price}>
                    <CircleDollarSign size={30} />
                    {info.content.price}
                </div>
                <div className={styles.menu__lvl}>
                    {info.content.lvl} lvl
                </div>
            </div>
            <button onClick={() => {
                haveMoney(info.content.price, info.content.profit, info.content.id - 1, setHourProfit);
                setModal(false);
            }} className={styles.submit}>
                Улучшить
            </button>
        </Modal >
    }

    const onclickCard = (e: MouseEvent<HTMLLIElement>) => {
        setInfo({
            id: +e.currentTarget.dataset.id!,
            content: info.content,
        });
        setModal(prev => !prev);
    }

    useEffect(() => {
        const dataCard = cards.find((item) => item.id === info.id);
        if (!dataCard) return
        setInfo({
            id: info.id,
            content: dataCard,
        });
    }, [modal])

    const [error, setError] = useState(false);

    const haveMoney = (price: number, value: number, index: number, func?: Dispatch<SetStateAction<number>> | null) => { // boosts.multitap[lvlclick].price
        if (balance >= price) { // если баланс больше или равен цене
            setBalance?.(prev => prev - price); // снимаем с баланса цену товара
            cards[index].lvl += 1; // увеличиваем уровень
            cards[index].price = Math.floor(cards[index].price * 1.2);
            cards[index].allProfit += cards[index].profit;
            cards[index].profit = Math.floor(cards[index].profit * 1.2);
            func?.(prev => prev += value); // увеличиваем значение
            let cut = (balance / roles[lvl].for_up) * 100;
            setWidth(cut);
        } else {
            setError(true)
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError(false);
        }, 5000);

        return () => clearTimeout(timeout)
    }, [error])

    return (
        <>
            <ErrorBlock active={error} setActive={setError}>
                У вас недостаточно монет!
            </ErrorBlock>
            <ul className={stylesCards.list} ref={mineRef}>
                {cards.map<ReactNode>(data => {
                    return (
                        <li onClick={(e: MouseEvent<HTMLLIElement>) => onclickCard(e)} data-id={data.id} key={data.id} className={stylesCards.item}>
                            <Card data={data} />
                        </li>
                    )
                })}
            </ul>
            {getModal()}
        </>
    )
}