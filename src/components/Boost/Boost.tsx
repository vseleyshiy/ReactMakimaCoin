import { Score } from '../Home/Score/Score'
import styles from './Boost.module.css'
import { List } from './List/List'

export function Boost() {
	return (
		<div className={styles.boostWrap}>
			<div className={styles.balance__title}>Ваш баланс</div>
			<Score />
			<div className={styles.boost}>
				<div className={styles.title}>Усилители</div>
				<List />
			</div>
		</div>
	)
}
