import { useEffect, useRef, useState } from 'react'
import { UseUser } from '../../../hooks/useUser'
import { ErrorBlock } from '../../../utils/ErrorBlock/ErrorBlock'
import styles from './Coin.module.css'
import { Props } from './types'
import image from '/public/makima.jpg'

export function Coin(props: Props) {

    const { energy, setEnergy } = props;

    const { setBalance, lvlClick } = UseUser();

    const [error, setError] = useState(false);

    const imageRef = useRef<HTMLImageElement>(null);
    const coinRef = useRef<HTMLDivElement>(null);

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

    return (
        <>
            <div className={styles.imgWrap} ref={coinRef} onClick={() => {
                setBalance?.(prev => prev + lvlClick);
                setEnergy?.(prev => prev - 10);
            }}>
                <img className={styles.img} ref={imageRef} src={image} />
            </div >
            <ErrorBlock active={error}>
                У вас недостаточно энергии!
            </ErrorBlock>
        </>
    )
}