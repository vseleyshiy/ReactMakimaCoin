import { CircleDollarSign } from 'lucide-react'
import { useUser } from '../../../hooks/useUser'
import styles from './Score.module.css'

export function Score() {
	const { balance } = useUser()

	return (
		<h1 className={styles.text}>
			<CircleDollarSign size={35} />
			{balance}
		</h1>
	)
}
