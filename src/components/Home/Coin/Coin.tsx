import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useUser } from '../../../hooks/useUser'
import styles from './Coin.module.css'
import image from '/public/makima.jpg'

export function Coin() {
	const coinRef = useRef<HTMLDivElement>(null)

	const { energy, setBalance, setEnergy } = useUser()

	useEffect(() => {
		if (!coinRef.current) return
		if (energy < 10) {
			coinRef.current.style.pointerEvents = 'none'
			toast.error('У вас недостаточно энергии!')
		} else {
			coinRef.current.style.pointerEvents = 'all'
		}
	}, [energy])

	return (
		<>
			<div
				className={styles.imgWrap}
				ref={coinRef}
				onClick={() => {
					setBalance?.(
						prev => prev + Number(sessionStorage.getItem('multitapLvl'))
					)
					setEnergy?.(prev => prev - 10)
				}}
			>
				<img className={styles.img} src={image} />
			</div>
		</>
	)
}
