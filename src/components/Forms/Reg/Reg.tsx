import axios from 'axios';
import { CircleHelp, Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorBlock } from '../../../utils/ErrorBlock/ErrorBlock';
import { SwitchWindow } from '../../../utils/Functions/SwitchWindow';
import { Props } from '../../General/types';
import styles from '../Forms.module.css';

export function Reg(props: Props) {

    const { setMenu } = props;

    const { register, handleSubmit, formState, reset, watch } = useForm<IReg>({
        mode: 'onChange',
    });

    const nameError = formState.errors.name?.message;
    const passError1 = formState.errors.password1?.message;
    const passError2 = formState.errors.password2?.message;

    const [help, setHelp] = useState(false);
    const [error, setError] = useState(false);

    const [passInfo, setPassInfo] = useState({
        password: "",
        showPassword1: false,
        showPassword2: false,
    });

    const [status, setStatus] = useState<TypeStatus>();

    const onSubmit: SubmitHandler<IReg> = (data) => {
        let formData = new FormData();
        formData.append('username', data.name);
        formData.append('password1', data.password1);
        formData.append('password2', data.password2);

        const fetchData = async () => {
            const response = await axios.post('https://reactmakimacoin.local/src/api/reg.php', formData)
            const json = await response.data;
            setStatus(json);
        }

        fetchData();
        reset();
    }

    useEffect(() => {
        if (status?.status == 'success') {
            SwitchWindow(setMenu, { auth: true });
        } else if (status?.status == 'error') {
            if (status.message == 'user already exists') {
                setError(true);
                const timeout = setTimeout(() => {
                    setError(false);
                }, 5000);

                return () => clearTimeout(timeout);
            }
        }
    }, [status])

    return (
        <>
            <div className={styles.form__wrap}>
                <h1 className={styles.title}>Регистрация</h1>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.form__main}>
                        <div className={styles.form__row}>
                            <span className={styles.error}>{nameError && nameError}</span>
                            <label htmlFor='namereg' className={styles.form__rowTitle}>Имя</label>
                            <div className={styles.form__inputWrap}>
                                <input id='namereg' className={styles.form__input} type="text"
                                    {...register(
                                        'name', {
                                        required: 'Это поле обязательно для заполнения!',
                                    }
                                    )}
                                />
                            </div>
                        </div>
                        <div className={styles.password__section}>
                            <div className={styles.form__row}>
                                <div className={styles.form__rowInfo}>
                                    <span className={styles.error}>{passError1 && passError1}</span>
                                    <label htmlFor='password1' className={styles.form__rowTitle}>Пароль</label>
                                    <CircleHelp className={styles.form__help} onClick={() => {
                                        setHelp(prev => !prev);
                                    }} />
                                </div>
                                <div className={styles.form__inputWrap}>
                                    <input id='password1' className={styles.form__input} type={
                                        passInfo.showPassword1
                                            ? "text"
                                            : "password"
                                    }
                                        {...register(
                                            'password1', {
                                            required: 'Это поле обязательно для заполнения!',
                                            pattern: {
                                                value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                                                message: 'Невалидный пароль!',
                                            }
                                        }
                                        )}
                                    />
                                    {passInfo.showPassword1 == true ?
                                        <Eye className={styles.form__inputButton} onClick={() => {
                                            setPassInfo({
                                                ...passInfo,
                                                showPassword1: !passInfo.showPassword1,
                                            });
                                        }} /> :
                                        <EyeOff className={styles.form__inputButton} onClick={() => {
                                            setPassInfo({
                                                ...passInfo,
                                                showPassword1: !passInfo.showPassword1,
                                            });
                                        }} />
                                    }
                                </div>
                            </div>
                            <div className={styles.form__row}>
                                <span className={styles.error}>{passError2 && passError2}</span>
                                <label htmlFor='password2' className={styles.form__rowTitle}>Повторите пароль</label>
                                <div className={styles.form__inputWrap}>
                                    <input id='password2' className={styles.form__input} type={
                                        passInfo.showPassword2
                                            ? "text"
                                            : "password"
                                    }
                                        {...register(
                                            'password2', {
                                            required: 'Заполните поле!',
                                            validate: (val: string) => {
                                                if (watch('password1') != val) {
                                                    return "Пароли не совпадают"
                                                }
                                            }
                                        }
                                        )}
                                    />
                                    {passInfo.showPassword2 == true ?
                                        <Eye className={styles.form__inputButton} onClick={() => {
                                            setPassInfo({
                                                ...passInfo,
                                                showPassword2: !passInfo.showPassword2,
                                            });
                                        }} /> :
                                        <EyeOff className={styles.form__inputButton} onClick={() => {
                                            setPassInfo({
                                                ...passInfo,
                                                showPassword2: !passInfo.showPassword2,
                                            });
                                        }} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={styles.form__button}>Зарегистрироваться</button>
                </form>
                <span className={styles.link}>
                    Уже зарегестрированы?
                    <div onClick={() => {
                        SwitchWindow(setMenu, { auth: true });
                    }} style={{
                        color: 'rgb(111, 111, 151)',
                    }}>Авторизация</div>
                </span>
                <div className={styles.error__list}>
                    <ErrorBlock padding={5} fontSize={13} active={help}>
                        Пароль должен содержать минимум 8 символов, 1 число, 1 спецсимвол, 1 латинскую бувку в верхнем и нижнем регистре
                    </ErrorBlock>
                    <ErrorBlock active={error}>
                        Пользователь с таким никнеймом уже занят!
                    </ErrorBlock>
                </div>
            </div>
        </>
    )
}