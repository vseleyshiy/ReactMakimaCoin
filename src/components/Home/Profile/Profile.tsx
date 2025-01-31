import { useState } from 'react'
import avatar from '../../../../public/avatar.jpg'
import styles from './Profile.module.css'
import { ProfileDialog } from './ProfileDialog'

export function Profile() {
	const [dialog, setDialog] = useState(false)
	const [nameWatch, setNameWatch] = useState('')

	// function for backend username
	// const changeUsername = async () => {
	// 	const data = {
	// 		status: 'username',
	// 		id: id,
	// 		user_data: nameWatch,
	// 	}
	// 	const response = await axios.post(
	// 		'https://reactmakimacoin.local/src/api/update.php',
	// 		`data=${JSON.stringify(data)}`
	// 	)
	// 	const info = await response.data
	// ПРОВЕРКА НА EMAIL!!!!!
	// 	if (info.status == 'error' && info.message == 'user already exists') {
	// 		setDialog(false)

	// 		return () => clearTimeout(timeout)
	// 	} else {
	// 		setUsername?.(nameWatch)
	// 		setDialog(false)
	// 	}
	// }

	return (
		<>
			<ProfileDialog
				dialog={dialog}
				setDialog={setDialog}
				setNameWatch={setNameWatch}
			/>
			<header className={styles.header}>
				<div className={styles.info}>
					<div className={styles.imgWrap}>
						<img src={avatar} className={styles.img} />
					</div>
					<div
						className={styles.username}
						onClick={() => {
							setDialog(true)
						}}
					>
						<div className={styles.name}>
							vseleyshiy
							{/* из hook вытащишь поставишь */}
							{/* {username} <Pencil className={styles.pencil} /> */}
						</div>
						<div className={styles.downtitle}>Нажмите, чтобы изменить</div>
					</div>
				</div>
			</header>
		</>
	)
}
