import { Dispatch, ReactNode, SetStateAction } from 'react';
import styles from './Modal.module.css';

interface Props {
    modalActive: boolean
    setModalActive: Dispatch<SetStateAction<boolean>>
    children: ReactNode
}

export function Modal(props: Props) {

    const { modalActive, setModalActive, children } = props;

    return (
        <div className={modalActive ? `${styles.modal} ${styles.active}` : `${styles.modal}`} onClick={() => setModalActive(false)}>
            <div className={modalActive ? `${styles.modal__content} ${styles.active}` : `${styles.modal__content}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div >
    )
}