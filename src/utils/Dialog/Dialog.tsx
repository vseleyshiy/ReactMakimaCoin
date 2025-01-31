import { X } from 'lucide-react';
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react';
import styles from './Dialog.module.css';

interface Props {
    dialog: boolean
    setDialog: Dispatch<SetStateAction<boolean>>
    children: ReactNode
}

export function Dialog(props: Props) {

    const { dialog, setDialog, children } = props;

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!dialogRef.current) return;
        if (dialog) {
            dialogRef.current.showModal();
            document.body.classList.add(styles.lock);
        } else {
            dialogRef.current.close();
            document.body.classList.remove(styles.lock);
        }
    }, [dialog])

    return (
        <dialog className={styles.dialog} ref={dialogRef}>
            <div className={styles.dialog__inner}>
                <X className={styles.cross} onClick={() => {
                    setDialog(false);
                }} />
                <form className={styles.form} method='dialog'>
                    {children}
                </form>
            </div>
        </dialog>
    )
}