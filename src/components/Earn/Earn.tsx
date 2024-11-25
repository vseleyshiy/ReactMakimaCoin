import { ChevronRight, CircleDollarSign } from 'lucide-react';
import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { tasks, user_tasks } from '../../database';
import { UseUser } from '../../hooks/useUser';
import { ErrorBlock } from '../../utils/ErrorBlock/ErrorBlock';
import { Modal } from '../../utils/Modal/Modal';
import listStyles from '../Boost/List/List.module.css';
import { Props } from '../General/types';
import styles from './Earn.module.css';
import { TypeInfo } from './types';
import axios from 'axios';

export function Earn(props: Props) {

    const { style } = props;

    const { id, setBalance } = UseUser();

    const [modal, setModal] = useState(false);

    const [error, setError] = useState(false);

    const [info, setInfo] = useState<TypeInfo>({
        id: 0,
        content: {
            id: undefined,
            name: undefined,
            description: undefined,
            reward: 0,
            img: undefined,
            link: undefined,
            execute: false,
        }
    })

    const [timerActive, setTimerActive] = useState(false);
    const [seconds, setSeconds] = useState(10);

    const onclickTask = (e: MouseEvent<HTMLDivElement>) => {
        if (!timerActive) {
            setInfo({
                id: +e.currentTarget.dataset.id!,
                content: info.content,
            });
        } else {
            setError(true);
            const timeout = setTimeout(() => {
                setError(false);
            }, 5000);

            return () => clearTimeout(timeout);
        }
        setModal(prev => !prev);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0 && timerActive) {
                setSeconds(prev => prev - 1);
            } else {
                setTimerActive(false);
                setSeconds(10);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timerActive, seconds])

    useEffect(() => {
        if (!timerActive) {
            setBalance?.(prev => prev + info.content.reward!);
            info.content.execute = true;
            const dataTask = user_tasks.find(item => item.id == info.content.id);
            if (!dataTask) {
                user_tasks.push({
                    id: info.content.id!,
                    name: info.content.name!,
                    description: info.content.description!,
                    reward: info.content.reward!,
                    img: info.content.img!,
                    link: info.content.link!,
                    execute: info.content.execute!,
                });
            }
            addTask();
        }
    }, [timerActive])

    useEffect(() => {
        const dataTask = tasks.find((item) => item.id === info.id);
        if (!dataTask) return
        setInfo({
            id: info.id,
            content: dataTask,
        });
    }, [modal])

    // add user's task backend
    const addTask = async () => {
        const data = {
            status: 'tasks',
            id: id,
            tasks: user_tasks,
        }
        await axios.post('https://reactmakimacoin.local/src/api/update.php', `data=${JSON.stringify(data)}`)
    }

    return (
        <>
            <div className={styles.earn} style={style}>
                <div className={styles.top__img}>
                    <CircleDollarSign size={120} />
                </div>
                <div className={styles.top__title}>
                    {timerActive && !info.content.execute ? `КД 00:${seconds == 10 ? seconds : '0' + seconds}` :
                        'Заработай больше монет!'
                    }
                </div>
                <div className={styles.list}>
                    {tasks.map<ReactNode>(el => {
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
                </div >
                <Modal modalActive={modal} setModalActive={setModal}>
                    <div className={listStyles.img__wrap}>
                        <img src={info.content.img} className={styles.img} />
                    </div>
                    <div className={listStyles.menu__title}>
                        {info.content.name}
                    </div>
                    <div className={listStyles.text}>
                        {info.content.description}
                    </div>
                    <div className={listStyles.info}>
                        <div className={listStyles.menu__price}>
                            <CircleDollarSign size={30} />
                            +{info.content.reward}
                        </div>
                    </div>
                    <a href={info.content.link}
                        style={{
                            pointerEvents: info.content.execute || timerActive ? 'none' : 'all'
                        }}
                        target='_blank' onClick={() => {
                            setModal(false);
                            setTimerActive(true);
                        }} className={
                            info.content.execute ?
                                `${listStyles.submit} ${listStyles.ex}` :
                                `${listStyles.submit}`
                        }
                    >
                        {info.content.execute ? 'Выполнено' : 'Перейти'}

                    </a>
                </Modal>
                <ErrorBlock active={error}>
                    В данный момент у вас идет КД!
                </ErrorBlock>
            </div >
        </>
    )
}

// сделать выбор биржи и смену ника