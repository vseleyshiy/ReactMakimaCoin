import { Dispatch, SetStateAction } from 'react'
import { Dialog } from '../../../utils/Dialog/Dialog'
import styles from './Profile.module.css'

interface Props {
	dialog: boolean
	setDialog: Dispatch<SetStateAction<boolean>>
	setNameWatch: Dispatch<SetStateAction<string>>
}

export function ProfileDialog(props: Props) {
	const { dialog, setDialog, setNameWatch } = props
	// щас напиши авторизацию, чтобы в sessionStrage добавлялись данные - из них уже можно дальше логику делать.

	return (
		<Dialog dialog={dialog} setDialog={setDialog}>
			<div className={styles.form__row}>
				<label className={styles.form__label} htmlFor='username'>
					Никнейм:
				</label>
				<input
					name='username'
					className={styles.input}
					type='text'
					placeholder='Ваш никнейм'
					defaultValue={
						sessionStorage.getItem('username')! !== ''
							? sessionStorage.getItem('username')!
							: 'anonymous'
					}
					onChange={e => {
						setNameWatch(e.target.value)
					}}
				/>
			</div>
			<button
				className={styles.button}
				onClick={() => {
					// mutate
					// changeUsername()
				}}
			>
				Сохранить
			</button>
		</Dialog>
	)
}
