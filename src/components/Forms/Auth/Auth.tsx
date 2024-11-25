import axios from 'axios';
import { CircleHelp, Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { user_cards, TypeCards, cards, TypeTasks, user_tasks, tasks } from '../../../database';
import { UseUser } from '../../../hooks/useUser';
import { ErrorBlock } from '../../../utils/ErrorBlock/ErrorBlock';
import { SwitchWindow } from '../../../utils/Functions/SwitchWindow';
import { Props } from '../../General/types';
import styles from '../Forms.module.css';
import { IAuth, TypeStatus } from '../types';

export function Auth(props: Props) {

    const { setMenu } = props;

    const { setId, setBalance, setLvlMaxEnergy, setLvlClick, setLvl, setUsername, setHourProfit } = UseUser();

    const { register, handleSubmit, formState, reset } = useForm<IAuth>({
        mode: 'onChange',
    });

    const [passInfo, setPassInfo] = useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setPassInfo({
            ...passInfo,
            showPassword: !passInfo.showPassword,
        });
    };

    const nameError = formState.errors.name?.message;
    const passError = formState.errors.password?.message;

    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    function getError(text: string) {
        setErrorText(text);
        setError(true);
        const timeout = setTimeout(() => {
            setError(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }

    const [status, setStatus] = useState<TypeStatus>();

    const onSubmit: SubmitHandler<IAuth> = (data) => {
        let formData = new FormData();
        formData.append('username', data.name);
        formData.append('password', data.password);

        const fetchData = async () => {
            const response = await axios.post('https://reactmakimacoin.local/src/api/auth.php', formData)
            const json = await response.data;
            setStatus(json);
        }
        fetchData();
        reset();
    }

    const findCard = (index: number, id: number) => {
        user_cards.forEach(el => {
            if (el.id == id) {
                cards.splice(index, 1, el);
            }
        });
    }

    const findTask = (index: number, id: number) => {
        user_tasks.forEach(el => {
            if (el.id == id) {
                tasks.splice(index, 1, el);
            }
        });
    }

    useEffect(() => {
        if (status?.status == 'success') {
            setId?.(status.data.id);
            setUsername?.(status.data.username);
            setLvl?.(status.data.roleLvl);
            setBalance?.(status.data.balance);
            setLvlMaxEnergy?.(status.data.maxEnergyLvl);
            setLvlClick?.(status.data.multitapLvl);
            setHourProfit?.(status.data.hourProfit);
            const cardsData: TypeCards[] = JSON.parse(status.data.cards);
            if (cardsData != null) {
                cardsData.forEach(el => user_cards.push(el));
            }
            cards.forEach((el, index) => {
                findCard(index, el.id);
            })
            const tasksData: TypeTasks[] = JSON.parse(status.data.tasks);
            if (tasksData != null) {
                tasksData.forEach(el => user_tasks.push(el));
            }
            tasks.forEach((el, index) => {
                findTask(index, el.id);
            })
            SwitchWindow(setMenu, { home: true, buttons: true });
        } else if (status?.status == 'error' && status.message == 'error password') {
            getError('Пароль неверный!');
        } else if (status?.status == 'error' && status.message == 'user not found') {
            getError('Пользователь с таким именем не найден!');
        }
    }, [status])

    // после всего этого переделка кода на более чистый, проверка и украшение всякого

    return (
        <>
            <div className={styles.form__wrap}>
                <h1 className={styles.title}>Авторизация</h1>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.form__main}>
                        <div className={styles.form__row}>
                            <span className={styles.error}>{nameError && nameError}</span>
                            <label htmlFor='name' className={styles.form__rowTitle}>Имя</label>
                            <div className={styles.form__inputWrap}>
                                <input id='name' className={styles.form__input} type="text"
                                    {...register(
                                        'name', {
                                        required: 'Это поле обязательно для заполнения!',
                                    }
                                    )}
                                />
                            </div>
                        </div>
                        <div className={styles.form__row}>
                            <div className={styles.form__rowInfo}>
                                <span className={styles.error}>{passError && passError}</span>
                                <label htmlFor='password' className={styles.form__rowTitle}>Пароль</label>
                                <CircleHelp className={styles.form__help} onClick={() => {
                                    setErrorText('Пароль должен быть написан латинскими буквами, содержать минимум 8 символов, 1 число, 1 спецсимвол, 1 латинскую бувку в верхнем и нижнем регистре.');
                                    setError(prev => !prev);
                                }} />
                            </div>
                            <div className={styles.form__inputWrap}>
                                <input id='password' className={styles.form__input} type={
                                    passInfo.showPassword
                                        ? "text"
                                        : "password"
                                }
                                    {...register(
                                        'password', {
                                        required: 'Это поле обязательно для заполнения!',
                                        pattern: {
                                            value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                                            message: 'Невалидный пароль!',
                                        }
                                    }
                                    )}
                                />
                                {passInfo.showPassword == true ?
                                    <Eye className={styles.form__inputButton} onClick={() => {
                                        handleClickShowPassword();
                                    }} /> :
                                    <EyeOff className={styles.form__inputButton} onClick={() => {
                                        handleClickShowPassword();
                                    }} />
                                }
                            </div>
                        </div>
                    </div>
                    <button className={styles.form__button}>Войти</button>
                </form>
                <span className={styles.link}>
                    Ещё не зарегестрированы?
                    <div onClick={() => {
                        SwitchWindow(setMenu, { reg: true });
                    }} style={{
                        color: 'rgb(111, 111, 151)',
                    }}>Регистрация</div>
                </span>
                <div className={styles.error__list}>
                    <ErrorBlock padding={5} fontSize={13} active={error}>
                        {errorText}
                    </ErrorBlock>
                </div>
            </div>
        </>
    )
}