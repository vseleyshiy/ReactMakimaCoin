import { Coins, Home, Pickaxe } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { RMC_PAGES } from '../../../config/pages-url.config'
import styles from './Buttons.module.css'

export function Buttons() {
	const [searchParams, setSearchParams] = useSearchParams()

	const [mine, setMine] = useState(false)

	useEffect(() => {
		searchParams.set('mine', `${mine}`)
		setSearchParams(searchParams)
	}, [mine])

	return (
		<ul className={styles.list}>
			<li className={styles.item}>
				<Link to={RMC_PAGES.HOME} className={styles.link}>
					<Home size={20} />
					Home
				</Link>
			</li>
			<li className={styles.item}>
				<div onClick={() => setMine(prev => !prev)} className={styles.link}>
					<Pickaxe size={20} />
					Mine
				</div>
			</li>
			<li className={styles.item}>
				<Link to={RMC_PAGES.EARN} className={styles.link}>
					<Coins size={20} />
					Earn
				</Link>
			</li>
		</ul>
	)
}
