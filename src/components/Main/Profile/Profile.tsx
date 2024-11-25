import styles from './Profile.module.css';
import avatar from '../../../../public/avatar.jpg'
import logo from '../../../../public/bybit_logo.jpg'
import { UseUser } from '../../../hooks/useUser';

export function Profile() {

    const { username, setUsername } = UseUser()

    return (
        <header className={styles.header}>
            <div className={styles.info}>
                <div className={styles.imgWrap}>
                    <img src={avatar} className={styles.img} />
                </div>
                <div className={styles.username}>
                    <input
                        id='username'
                        onChange={(e) => {
                            setUsername?.(e.target.value);
                        }}
                        className={styles.name} value={username} />
                    <label htmlFor='username' className={styles.downtitle}>Нажмите, чтобы изменить</label>
                </div>
            </div>
        </header>
    )
}

// ты изучил хуки, useState, useEffect, useRef, useContext, из которой создал свой собственный useAuth,
// сделал свой провайдер для useAuth при помощи useContext



// some text on comm