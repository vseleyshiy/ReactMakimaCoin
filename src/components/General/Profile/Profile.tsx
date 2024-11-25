import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import avatar from '../../../../public/avatar.jpg';
import { UseUser } from '../../../hooks/useUser';
import { Dialog } from '../../../utils/Dialog/Dialog';
import { ErrorBlock } from '../../../utils/ErrorBlock/ErrorBlock';
import styles from './Profile.module.css';

export function Profile() {

    const { id, username, setUsername } = UseUser();

    const [nameWatch, setNameWatch] = useState('');
    const [dialog, setDialog] = useState(false);
    const [error, setError] = useState(false);

    // function for backend username
    const changeUsername = async () => {
        const data = {
            status: 'username',
            id: id,
            username: nameWatch,
        }
        const response = await axios.post('https://reactmakimacoin.local/src/api/update.php', `data=${JSON.stringify(data)}`)
        const info = await response.data;
        if (info.status == 'error' && info.message == 'user already exists') {
            setError(true);
            setDialog(false);
            const timeout = setTimeout(() => {
                setError(false);
            }, 5000);

            return () => clearTimeout(timeout);
        } else {
            setUsername?.(nameWatch);
            setDialog(false);
        }
    }

    return (
        <>
            <Dialog dialog={dialog} setDialog={setDialog} >
                <div className={styles.form__row}>
                    <label className={styles.form__label} htmlFor="username">Никнейм:</label>
                    <input name='username' className={styles.input} type="text" placeholder='Ваш никнейм' defaultValue={username} onChange={(e) => {
                        setNameWatch(e.target.value);
                    }} />
                </div>
                <button className={styles.button} onClick={() => {
                    changeUsername();
                }}>Сохранить</button>
            </Dialog>
            <header className={styles.header}>
                <div className={styles.info}>
                    <div className={styles.imgWrap}>
                        <img src={avatar} className={styles.img} />
                    </div>
                    <div className={styles.username} onClick={() => {
                        setDialog(true);
                    }}>
                        <div className={styles.name}>
                            {username} <Pencil className={styles.pencil} />
                        </div>
                        <div className={styles.downtitle}>Нажмите, чтобы изменить</div>
                    </div>
                </div>
            </header>
            <ErrorBlock active={error}>
                Этот никнейм уже занят!
            </ErrorBlock>
        </>
    )
}