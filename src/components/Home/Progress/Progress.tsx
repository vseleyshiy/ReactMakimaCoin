import { useEffect, useRef } from 'react'
import { useUser } from '../../../hooks/useUser'
import styles from './Progress.module.css'

export function Progress() {
	const { balance, setBalance } = useUser()

	const lvlClick = Number(sessionStorage.getItem('multitapLvl'))
	const hourProfit = Number(sessionStorage.getItem('hourProfit'))

	// function for backend balance
	// useBalanceDebounce('balance')

	// const { user_role } = useRoleLvl()

	// function for backend lvl
	// const data = {
	// 		id: id,
	// 			status: 'role_lvl',
	// 			user_data: lvl,
	// 	// 	}
	// useUpdate(data)

	// add balance on useEffect
	useEffect(() => {
		const interval = setInterval(() => {
			setBalance?.(
				prev => prev + (lvlClick * 5 + Math.floor(hourProfit / 60 / 15))
			)
		}, 3000)

		return () => clearInterval(interval)
	}, [])

	// function to change the progress bar
	const barRef = useRef<HTMLDivElement>(null)

	// тут надо на данные роли из бд заменить за место вот этих статичных 10000
	const changeProgress = () => {
		if (!barRef.current) return
		let cut = (balance / 10000) * 100
		barRef.current.style.width = `${cut}%`
	}

	// changing the progress bar with balance changes

	// тут надо на данные роли из бд заменить за место вот этих статичных 10000 ТОЖЕ
	useEffect(() => {
		if (balance >= 10000) {
			let roleLvl = Number(sessionStorage.getItem('roleLvl'))
			roleLvl++
			sessionStorage.setItem('roleLvl', String(roleLvl))
		}
		changeProgress()
	}, [balance])

	// useEffect(() => {
	// 	changeProgress()
	// 	upLvl()
	// }, [lvl])

	return (
		<div className={styles.progress}>
			<div className={styles.info}>
				{/* <div className={styles.role}>{user_role.role}</div> */}
				<div className={styles.role}>Bronze</div>
				<div className={styles.lvl}>
					Level
					<span className={styles.lvlValue}>
						{Number(sessionStorage.getItem('roleLvl'))! + 1}/5
					</span>
				</div>
			</div>
			<div className={styles.bar}>
				<div ref={barRef} className={styles.passed}></div>
			</div>
		</div>
	)
}
