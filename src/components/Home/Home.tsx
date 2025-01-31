import styles from './Home.module.css'
import { Info } from './Info/Info'
import { Profile } from './Profile/Profile'

export function Home() {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.appWrap}>
					<Profile />
					<Info />
				</div>
			</div>
		</>
	)
}
