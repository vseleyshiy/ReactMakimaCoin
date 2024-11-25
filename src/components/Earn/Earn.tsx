import { MouseEvent, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import styles from './Earn.module.css'
import listStyles from '../Boost/List/List.module.css'
import { Buttons } from '../Main/Buttons/Buttons'
import { ChevronRight, CircleDollarSign } from 'lucide-react';
import { tasks } from '../../database';
import { Modal } from '../../utils/Modal/Modal';
import { UseUser } from '../../hooks/useUser';
import { ErrorBlock } from '../../utils/ErrorBlock/ErrorBlock';

interface Props {
    earnRef: RefObject<HTMLDivElement>
    boostRef: RefObject<HTMLDivElement>
    mainRef: RefObject<HTMLDivElement>
}
type TypeInfo = {
    id: number
    content: {
        id: number | undefined
        name: string | undefined
        desc: string | undefined
        reward: number
        img: string | undefined
        link: string | undefined
        execute: boolean | undefined
    }
}

export function Earn(props: Props) {

    const { earnRef, boostRef, mainRef } = props

    const { setBalance } = UseUser();

    const [modal, setModal] = useState(false);

    const [info, setInfo] = useState<TypeInfo>({
        id: 0,
        content: {
            id: undefined,
            name: undefined,
            desc: undefined,
            reward: 0,
            img: undefined,
            link: undefined,
            execute: undefined,
        }
    })

    const onclickTask = (e: MouseEvent<HTMLDivElement>) => {
        setInfo({
            id: +e.currentTarget.dataset.id!,
            content: info.content,
        });
        setModal(prev => !prev);
    }

    const [click, setClick] = useState(false);
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(prev => prev - 1)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [click])

    useEffect(() => {
        setTimer(10);
        if (click) {
            const timeout = setTimeout(() => {
                info.content.execute = true;
                setBalance?.(prev => prev + info.content.reward!);
                setClick(false);
            }, 10000);

            return () => clearTimeout(timeout)
        }
    }, [click])

    useEffect(() => {
        tasks.forEach((el, index) => {
            const dataTask = tasks[index].tasks.find((item) => item.id === info.id);
            if (!dataTask) return
            setInfo({
                id: info.id,
                content: dataTask,
            });
        })
    }, [modal])

    return (
        <>
            <div className={styles.earn} ref={earnRef}>
                <div className={styles.top__img}>
                    <CircleDollarSign size={120} />
                </div>
                <div className={styles.top__title}>
                    Заработай больше монет!
                </div>
                {tasks.map<ReactNode>(data => {
                    return (
                        <div className={styles.block} key={data.title}>
                            <div className={styles.block__title}>{data.title}</div>
                            <div className={styles.list}>
                                {data.tasks.map<ReactNode>(el => {
                                    return (
                                        <div className={styles.item} onClick={(e: MouseEvent<HTMLDivElement>) => onclickTask(e)} key={el.id} data-id={el.id}>
                                            <div className={styles.content}>
                                                <div className={styles.img__wrap}>
                                                    <img className={styles.img} src={el.img} />
                                                </div>
                                                <div className={styles.info}>
                                                    <div className={styles.title}>
                                                        {el.name}
                                                    </div>
                                                    <div className={styles.price}>
                                                        <CircleDollarSign size={16} />
                                                        +{el.reward}
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight />
                                        </div>
                                    )
                                })}
                            </div>
                            <Modal modalActive={modal} setModalActive={setModal}>
                                <div className={listStyles.img__wrap}>
                                    <img src={info.content.img} className={styles.img} />
                                </div>
                                <div className={listStyles.menu__title}>
                                    {info.content.name}
                                </div>
                                <div className={listStyles.text}>
                                    {info.content.desc}
                                </div>
                                <div className={listStyles.info}>
                                    <div className={listStyles.menu__price}>
                                        <CircleDollarSign size={30} />
                                        +{info.content.reward}
                                    </div>
                                </div>
                                <a href={info.content.link}
                                    style={{
                                        pointerEvents: info.content.execute || click ? 'none' : 'all'
                                    }}
                                    target='_blank' onClick={() => {
                                        setModal(false);
                                        setClick(true);
                                    }} className={
                                        info.content.execute ?
                                            `${listStyles.submit} ${listStyles.ex}` :
                                            `${listStyles.submit}`
                                    }
                                >
                                    {click && !info.content.execute ? `КД на выполнение: ${timer}` :
                                        info.content.execute ? 'Выполнено' : 'Перейти'}

                                </a>
                            </Modal>
                        </div>
                    )
                })}
                <Buttons boostRef={boostRef} mainRef={mainRef} earnRef={earnRef} />
            </div >
        </>
    )
}

// сделать выбор биржи и смену ника