import { CircleDollarSign } from 'lucide-react'
import styles from './Blocks.module.css'

export function Blocks() {
	// const { user_role } = useRoleLvl()

	return (
		<ul className={styles.list}>
			<li className={styles.item}>
				<div className={styles.title}>Прибыль за тап</div>
				<div className={styles.value}>
					<CircleDollarSign size={18} />
					<span className={styles.valueNum}>
						+{sessionStorage.getItem('multitapLvl')}
					</span>
				</div>
			</li>
			<li className={styles.item}>
				<div className={styles.title}>Монет для апа</div>
				<div className={styles.value}>
					{/* <span className={styles.valueNum}>{user_role.for_up}</span> */}
					<span className={styles.valueNum}>10000</span>
				</div>
			</li>
			<li className={styles.item}>
				<div className={styles.title}>Прибыль в час</div>
				<div className={styles.value}>
					<CircleDollarSign size={18} />
					<span className={styles.valueNum}>
						+{sessionStorage.getItem('hourProfit')}
					</span>
				</div>
			</li>
		</ul>
	)
}
