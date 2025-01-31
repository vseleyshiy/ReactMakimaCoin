import { Rocket, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RMC_PAGES } from '../../../config/pages-url.config'
import { useUser } from '../../../hooks/useUser'
import styles from './Energy.module.css'

export function Energy() {
	// installation energy after authenticate
	// useEffect(() => {
	// 	const energyNum =
	// 		lvlMaxEnergy == 1 ? 2000 : boosts.MaxEnergy[lvlMaxEnergy - 1].energy

	// 	setMaxEnergy?.(energyNum)
	// }, [lvlMaxEnergy])

	// useEffect(() => {
	// 	setEnergy(maxEnergy)
	// }, [maxEnergy])

	// add energy with help of interval
	// const [addEnergy, setAddEnergy] = useState(true)

	// useEffect(() => {
	// 	if (energy >= maxEnergy) {
	// 		setAddEnergy(false)
	// 	} else {
	// 		setAddEnergy(true)
	// 	}
	// }, [energy])

	// useEffect(() => {
	// 	if (addEnergy) {
	// 		const interval = setInterval(() => {
	// 			setEnergy?.(prev => prev + 10)
	// 		}, 3000)

	// 		return () => clearInterval(interval)
	// 	}
	// }, [addEnergy])

	const { energy } = useUser()

	return (
		<div className={styles.energy}>
			<ul className={styles.list}>
				<div className={styles.item}>
					<Zap />
					<span className={styles.value}>
						{/* макс энерджи из бд и при релоаде сохранять в локалсторедж текущаю энергию, чтобы без мухлежа */}
						{/* {energy} / {maxEnergy} */}
						{energy} / 2000
					</span>
				</div>
				<Link to={RMC_PAGES.BOOST} className={styles.item}>
					<Rocket />
					<span className={styles.value}>Boost</span>
				</Link>
			</ul>
		</div>
	)
}
