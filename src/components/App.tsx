import React, { useEffect, useState } from 'react'
import styles from './App.module.css'
import { Home } from './Home/Home'

export function App() {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false)
		}, 2000)
		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return (
		<React.StrictMode>
			{loading ? (
				<div className={styles.loading}>
					<h1 className={styles.loading__title}>ReactMakimaCoin</h1>
					<div className={styles.loading__text}>loading...</div>
				</div>
			) : (
				<>
					<Home />
				</>
			)}
		</React.StrictMode>
	)
}
