import { Dispatch, MutableRefObject, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import image from '/public/makima.jpg'
import styles from './Coin.module.css'
import { UseUser } from '../../../hooks/useUser'
import { roles } from '../../../database'
import { ErrorBlock } from '../../../utils/ErrorBlock/ErrorBlock'

interface Props {
    setWidth: Dispatch<SetStateAction<number>>
    getWidth: () => void
}

export function Coin(props: Props) {

    const { lvl, balance, setBalance, setEnergy, energy, lvlClick } = UseUser()

    const { setWidth, getWidth } = props;

    const [shadow, setShadow] = useState(true);

    const [error, setError] = useState(false)

    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!coinRef.current) return;
        if (!imageRef.current) return;
        if (energy < 10) {
            coinRef.current.style.pointerEvents = 'none'
            imageRef.current.style.boxShadow = '0px 0px 10px red';
            setError(true);
        } else {
            coinRef.current.style.pointerEvents = 'all';
            imageRef.current.style.boxShadow = 'none';
            setError(false);
        }
    }, [energy])

    const coinRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <div className={styles.imgWrap} ref={coinRef} onClick={() => {
                setBalance?.(prev => prev + lvlClick);
                setEnergy?.(prev => prev - 10);
                let cut = (balance / roles[lvl].for_up) * 100;
                setWidth(cut);
                getWidth();
                setShadow(prev => !prev);
            }}>
                <img className={styles.img} ref={imageRef} src={image} />
            </div >
            <ErrorBlock active={error} setActive={setError}>
                У вас недостаточно энергии!
            </ErrorBlock>
        </>
    )
}